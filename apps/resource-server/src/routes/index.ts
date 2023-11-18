import { Router } from "express";
import AppError from "@server/utils/app-error";
import ErrorHandler from "@server/controllers/error";
import InvoiceRouter from "@server/routes/invoice";
import passport from "passport";

const router = Router();

router.get("/", (_, res) => {
  res.status(200).json({
    success: true,
    message: "Hey, I am Resource server for InvoiceX😁!",
  });
});
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.use("/invoices", InvoiceRouter);
router
  .use("*", (req, res, next) => {
    next(
      new AppError(`Cannot find the ${req.originalUrl} on this server 😓`, 404)
    );
  })
  .use(ErrorHandler);

export default router;
