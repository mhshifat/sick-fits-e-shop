import { createTransport, getTestMessageUrl } from "nodemailer";

const transport = createTransport({
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
});

const makeANiceEmail = (text: string) => `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
    </div>
  `;

export const sendPasswordResetEmail = async (
	resetToken: string,
	to: string
): Promise<void> => {
	const info = await transport.sendMail({
		to,
		from: "shifat@mhs.com",
		subject: "Your password reset token",
		html: makeANiceEmail(`Your password reset token is here!
      <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>
    `),
	});
	if (process.env.MAIN_USER.includes("ethereal.email")) {
		// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
		console.log(`📭 Message Sent! Preview it at ${getTestMessageUrl(info)}`);
	}
};
