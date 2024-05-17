const mongoose = require("mongoose");

const { User } = require("../model/index");

exports.createNew = async (req, res, next) => {
  try {
    const news = await User.create(req.body);
    res.status(200).json({
      success: true,
      data: news,
    });
  } catch (error) {
    console.log("fatching a data", error);
    next(error);
  }
};

exports.getNew = async (req, res) => {
  try {
    const limit = parseInt(req.query.size) || 5;
    const currentPage = parseInt(req.query.page) || 1;
    const currentSkip = (currentPage - 1) * limit;

    const data = await User
      .find({})
      .limit(limit)
      .skip(currentSkip)
      .sort({ createdAt: 1, _id: 1 });

    const totalRecords = await User.countDocuments({});
    const pages = Math.ceil(totalRecords / limit);

    return res.status(200).json({
      success: true,
      pagination: {
        total: totalRecords,
        limit,
        currentPage,
        pages,
      },
      data,
    });
  } catch (error) {
    console.log("Error getting User ", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

exports.putNew = async (req, res) => {
  const newId = req.params.id;
  const newupdated = req.body;

  try {
    const news = await User.findByIdAndUpdate(newId, newupdated, {
      new: true,
    });

    if (!news) {
      return res.status(404).json({
        success: false,
        error: "news not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Updated Successfully",
      data: news,
    });
  } catch (error) {
    console.error("news not updated", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};

// exports.deleteNew = async (req, res) => {
//   const newsId = req.params.id;

//   try {
//     const news = await User.findByIdAndDelete(newsId);
//     console.log(news);

//     if (!newsId) {
//       return res.status(404).json({
//         success: false,
//         error: "newsId not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Deleted Successfully",
//       data: newsId,
//     });
//   } catch (error) {
//     console.log("Error deleting newsId record", error);
//     return res.status(500).json({
//       success: false,
//       error: "Internal server error",
//     });
//   }
// };

//new

exports.deleteMultipleNews = async (req, res) => {
  const { ids } = req.body; // Assume the request body contains an array of IDs

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({
      success: false,
      error: "Invalid request, please provide an array of IDs",
    });
  }

  try {
    const result = await User.deleteMany({ _id: { $in: ids } });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        error: "No records found to delete",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Deleted Successfully",
      data: result.deletedCount,
    });
  } catch (error) {
    console.log("Error deleting records", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
};
