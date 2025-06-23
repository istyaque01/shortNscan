import { urlModel } from "../model/url.model.js";
import shortid from "shortid";
import { userModel } from "../model/user.model.js";

export const createUrl = async (req, res) => {
  const { url } = req?.body;

  try {
    if (!url) {
      return res
        .status(400)
        .json({ status: false, message: "Invalid URL or Url required" });
    }

    const alreadyShortedUrl = await urlModel.findOne({ url });

    if (alreadyShortedUrl) {
      return res.status(400).json({
        status: false,
        message: "This Link is already shortned, please check your dashboard",
      });
    }

    const authUser = req?.user?.id;

    const getAuthUserId = await userModel.findOne({ email: authUser });

    const shortId = shortid.generate();

    const shortUrl = `http://localhost:8000/sNs/${shortId}`;
    const data = await urlModel.create({
      url,
      shortId,
      shortUrl,
      owner: getAuthUserId?._id,
    });

    await data.save();

    return res
      .status(201)
      .json({ status: true, message: "URL created ", url: shortUrl });
  } catch (error) {
    console.log(error);

    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const routeToUrl = async (req, res) => {
  try {
    const { id } = req.params;

    const url = await urlModel.findOne({ shortId: id });

    if (!url) {
      return res.status(404).json({ status: false, message: "Invalid URL" });
    }

    url.clicks = url.clicks + 1;
    await url.save();
    res.redirect(url.url);
  } catch (error) {
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};

export const getAllUrl = async (req, res) => {
  try {
console.log("hello");

    const payload = req?.user?.id;
    const isUser = await userModel.findOne({email:payload})
    
    const urls = await urlModel.find({ owner: isUser?._id });
    

    return res.json({ status: true, urls });
  } catch (error) {
    console.log(error);
    
    return res
      .status(500)
      .json({ status: false, message: "Internal server error" });
  }
};
