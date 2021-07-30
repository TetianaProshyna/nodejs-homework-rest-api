const Contact = require("../../model/contact");
const listContacts = async (req, res, next) => {
  const userId = req.user.id;
  const { limit = 20, offset = 0, sortBy, sortByDesc, filter } = req.query;
  try {
    const { docs: contacts, totalDocs: total } = await Contact.paginate(
      { owner: userId },
      {
        limit,
        offset,
        sort: {
          ...(sortBy ? { [`${sortBy}`]: 1 } : {}),
          ...(sortByDesc ? { [`${sortByDesc}`]: -1 } : {}),
        },
        select: filter ? filter.split("|").join(" ") : "",
        populate: {
          path: "owner",
          select: "email subscription",
        },
      }
    );
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
        total,
      },
    });
  } catch (error) {
    next(error);
  }
};
module.exports = listContacts;
