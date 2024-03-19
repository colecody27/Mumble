async function addAdminRole(userId, adminType, channelIds) {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    if (!user.roles) {
      user.roles = [];
    }

    // Add admin role
    if (adminType === "databaseAdmin") {
      user.roles.push({ role: "databaseAdmin" });
    } else if (adminType === "channelAdmin") {
      user.roles.push({ role: "channelAdmin", channels: channelIds });
    }

    await user.save();
    return "Admin role added successfully";
  } catch (error) {
    console.error("Error adding admin role:", error);
    throw error;
  }
}
module.exports = { addAdminRole };
