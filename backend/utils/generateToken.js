import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) => {
	const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
		expiresIn: "15d",
	});

	res.cookie("jwt", token, {
		secure: process.env.NODE_ENV !== "development", //This flag ensures that the cookie is only sent over HTTPS connections, preventing it from being transmitted over unencrypted HTTP connections.
		maxAge: 15 * 24 * 60 * 60 * 1000, //ms
		httpOnly: true, // By setting this flag, the cookie cannot be accessed or modified by JavaScript, reducing the risk of cross-site scripting (XSS) attacks.
		sameSite: "strict", // The SameSite attribute specifies when the cookie should be sent. Setting it to 'strict' ensures that the cookie is only sent with requests originating from the same site, helping to prevent cross-site request forgery (CSRF) attacks.
	});
};
export default generateTokenAndSetCookie;
