const User = require("../../model/user");
const path = require("path");
const fs = require("fs/promises");
const jimp = require("jimp");

const AVATAR_DIR = path.join(process.cwd(), "public", "avatars");

const changeAvatar = async (req, res, next) => {
  try {
    if (req.file) {
      const { file, user } = req;
      console.log(file.path);
      const img = await jimp.read(file.path);
      await img
        .autocrop()
        .cover(
          250,
          250,
          jimp.HORIZONTAL_ALIGN_CENTER || jimp.VERTICAL_ALIGN_MIDDLE
        )
        .writeAsync(file.path);
      const imgNewPath = path.join(
        AVATAR_DIR,
        Date.now() + "-" + file.originalname
      );
      console.log(imgNewPath);
      await fs.rename(file.path, imgNewPath);
      const result = await User.findByIdAndUpdate(
        user._id,
        {
          avatarURL: imgNewPath,
        },
        { new: true }
      );
      return res.json({
        data: {
          avatarURL: result.avatarURL,
        },
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = changeAvatar;
