import WebSocket from "ws";
import { db } from "./lib/db";
export class RoomManager {
  private static instance: RoomManager;
  public spaces: Map<string, Space>;
  public users: Map<string, User>;
  public wsToSpace: Map<WebSocket, string>;

  private constructor() {
    this.spaces = new Map();
    this.users = new Map();
    this.wsToSpace = new Map();
  }
  static getInstance() {
    if (!RoomManager.instance) {
      RoomManager.instance = new RoomManager();
    } else return this.instance;
  }

  async playNext(data: any) {
    const {  spaceId } = data;
 console.log("playNext")
    try {
      const mostUpvotedStream = await db.stream.findFirst({
        where: {
          spaceId: Number(spaceId),
          active: true,
        },
        orderBy: [
          {
            upvotes: {
              _count: "desc",
            },
          },
          {
            createdAt: "asc", 
          },
        ],
      });

      const space = this.spaces.get(spaceId);
      console.log(mostUpvotedStream)

      if (!mostUpvotedStream) {
        await db.currentStream.deleteMany({
          where: {
            spaceId: Number(spaceId),
          },
        });
       if(!space) return 
        for (const [, user] of space.users) {
          for (const ws of user.ws) {
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ type: "refetch-queue" }));
              ws.send(JSON.stringify({ type: "refetch-current-stream" }));
            }
          }
        }
        return
      }
     
      await Promise.all([
        db.currentStream.upsert({
          where: {
            spaceId: Number(spaceId),        
          },
          update: {
            streamId: mostUpvotedStream.id,
          },
          create: {
            userId: Number(mostUpvotedStream.userId),
            spaceId: Number(spaceId),
            streamId: mostUpvotedStream.id,
          },
        }),
        db.stream.update({
          where: {
            id: mostUpvotedStream.id,
          },
          data: {
            active: false,
          },
        }),
      ]);

      if (space) {
        for (const [, user] of space.users) {
          for (const ws of user.ws) {
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ type: "refetch-queue" }));
              ws.send(JSON.stringify({ type: "refetch-current-stream" }));
            }
          }
        }
      }
    } catch (e) {
      console.error("Error in playNext:", e);
    }
  }
  async addToQueue(data: any) {
    try {
      const { userId, url, extractedId, spaceId } = data;
  
      await db.stream.create({
        data: {
          userId: Number(userId),
          type: "youtube",
          extractedId,
          url,
          bigImage: "",
          spaceId: Number(spaceId),
          smallImage: "",
        },
      });
  
      const space = this.spaces.get(spaceId);
      if (space) {
        for (const [, user] of space.users) {
          for (const ws of user.ws) {
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ type: "refetch-queue" }));
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in addToQueue:", error);
    }
  }
  
  async upVote(data: any) {
    try {
      const { userId, spaceId, streamId } = data;
      console.log(userId)
      await db.upvotes.create({
        data: {
          user: { connect: { id: Number(userId) } },
          stream: { connect: { id: Number(streamId) } },
        },
      });
  
      const space = this.spaces.get(spaceId);
      if (space) {
        for (const [, user] of space.users) {
          for (const ws of user.ws) {
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ type: "new-vote" }));
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in upVote:", error);
    }
  }
  

  async downVote(data: any) {
    try {
      const { userId, streamId, spaceId } = data;
      console.log("Down Vote", userId, "for stream", streamId);
  
      await db.upvotes.deleteMany({
        where: {
          userId: Number(userId),
          streamId: Number(streamId),
        },
      });
  
      const space = this.spaces.get(spaceId);
      if (space) {
        for (const [, user] of space.users) {
          for (const ws of user.ws) {
            if (ws.readyState === ws.OPEN) {
              ws.send(JSON.stringify({ type: "new-vote" }));
            }
          }
        }
      }
    } catch (error) {
      console.error("Error in downVote:", error);
    }
  }
  

  async joinRoom(spaceId: string, creatorId: string, userId: string, ws: WebSocket) {
    try {
      console.log("Join Room " + userId);
      let space = this.spaces.get(spaceId);
      let user = this.users.get(userId);
  
      if (!space) {
        await this.createRoom(spaceId);
        space = this.spaces.get(spaceId);
      }
  
      if (!user) {
        await this.addUser(userId, ws);
        user = this.users.get(userId);
      } else {
        if (!user.ws.some((existingWs) => existingWs === ws)) {
          user.ws.push(ws);
        }
      }
  
      this.wsToSpace.set(ws, spaceId);
  
      if (space && user) {
        space.users.set(userId, user);
        this.spaces.set(spaceId, {
          ...space,
          users: new Map(space.users),
          creatorId: creatorId,
        });
      }
  
      for (const [key, value] of this.spaces) {
        console.log("Space ID:", key, "Space Object:", value);
      }
    } catch (error) {
      console.error("Error in joinRoom:", error);
    }
  }
  async createRoom(spaceId: string) {
    try {
      console.log(process.pid + ": createRoom: ", { spaceId });
      if (!this.spaces.has(spaceId)) {
        this.spaces.set(spaceId, {
          users: new Map<string, User>(),
          creatorId: "",
        });
      }
    } catch (error) {
      console.error("Error in createRoom:", error);
    }
  }
  
  async addUser(userId: string, ws: WebSocket) {
    try {
      let user = this.users.get(userId);
      if (!user) {
        this.users.set(userId, {
          userId,
          ws: [ws],
        });
      } else {
        if (!user.ws.some((existingWs) => existingWs === ws)) {
          user.ws.push(ws);
        }
      }
    } catch (error) {
      console.error("Error in addUser:", error);
    }
  }
}
export type User = {
  userId: string;
  ws: WebSocket[];
};

export type Space = {
  creatorId: string;
  users: Map<String, User>;
};
