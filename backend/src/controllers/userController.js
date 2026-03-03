export const getUser = async (req, res) => {
  try {
    const user = req.user; // Assuming the user is attached to the request object by the authentication middleware
    res.status(200).json({
      user,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res.status(500).json({ message: error.message });
  }
};
