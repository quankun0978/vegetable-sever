export const mailResetTemplate = (content, buttonUrl, buttonText) => {
  return `<!DOCTYPE html>
    <html>
    <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
      <div
        style="
          max-width: 400px;
          margin: 10px;
          background-color: #fafafa;
          padding: 25px;
          border-radius: 20px;
        "
      >
        <p style="text-align: left;">
          ${content}
        </p>
        <a href="${buttonUrl}" target="_blank">
          <button
            style="
              background-color: #444394;
              border: 0;
              width: 200px;
              height: 30px;
              border-radius: 6px;
              color: #fff;
            "
          >
            ${buttonText}
          </button>
        </a>
        <p style="text-align: left;">
          If you are unable to click the above button, copy paste the below URL into your address bar
        </p>
        <a href="${buttonUrl}" target="_blank">
            <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none;">
              ${buttonUrl}
            </p>
        </a>
      </div>
    </body>
  </html>`;
};

export const mailPaymentTemplate = (url) => {
  return `<!DOCTYPE html>
      <html>
      <body style="text-align: center; font-family: 'Verdana', serif; color: #000;">
        <div
          style="
            max-width: 400px;
            margin: 10px;
            background-color: #fafafa;
            padding: 25px;
            border-radius: 20px;
          "
        >
        <p>Bạn vừa có đơn hàng mới ấn vào đây để xem chi tiết</p> <a href=${url}>chi tiết</a>   
        </div>
      </body>
    </html>`;
};

export const handleCountPoint = (money) => {
  return money < 100000 ? 0 : Math.trunc(money / 100000) * 5;
};
