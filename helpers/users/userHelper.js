module.exports.userInfo = (user) => {
  const userInfo = {
    _id: user._id,
    company: user.company,
    email: user.email,
    fname: user.fname,
    lname: user.lname,
    phone: user.phone,
    address: user.address,
    gender: user.gender,
    profile_pic: user.filename
  }
  return userInfo;
}