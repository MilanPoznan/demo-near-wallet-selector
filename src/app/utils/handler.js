import dbConnect from "./mongodb";

export default async function handler(req, res) {

    const { method } = req;

    await dbConnect();

    //TO DO WHEN YOU HAVE YOUR MODELS
    /**
     * Example 
     * 
     *  try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
      } catch (error) {
        res.status(400).json({ success: false });
      }
     */
}