const Contact = require("../../model/contact");
const listContacts = async (req, res, next) => {
  const userId = req.user.id;
  const {
    limit = 20,
    page = 1,
    sortBy,
    sortByDesc,
    filter,
    favorite,
  } = req.query;
  try {
    const { docs: contacts, totalDocs: total } = await Contact.paginate(
      { owner: userId },
      {
        limit,
        page,
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
    if (favorite) {
      const filteredContacts = contacts.filter((el) => el.favorite);
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts: filteredContacts,
          total: filteredContacts.length,
        },
      });
    } else {
      res.json({
        status: "success",
        code: 200,
        data: {
          contacts,
          total,
        },
      });
    }
  } catch (error) {
    next(error);
  }
};
module.exports = listContacts;
