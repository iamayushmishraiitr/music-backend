"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SPT_REGEX = exports.YT_REGX = void 0;
exports.YT_REGX = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
exports.SPT_REGEX = /^(https?:\/\/)?(open\.)?spotify\.com\/(track|playlist|album|artist)\/[a-zA-Z0-9]+$/i;
