const express = require("express");
const protect = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const {
  requestBorrowBook,
  acceptRejectRequestBorrowBook,
  getRequests,
} = require("../controllers/request.controller");
const router = express.Router();

router.get("/", protect, getRequests);
router.post(`/:bookId`, protect, requestBorrowBook);
router.patch(
  `/:requestId/status`,
  protect,
  roleMiddleware("admin"),
  acceptRejectRequestBorrowBook,
);

module.exports = router;
