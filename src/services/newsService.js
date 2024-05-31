import db from "../models";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

export const handleGetListNews = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await db.News.findAll({
        subQuery: false,
        raw: true,
        nest: true,
      });
      if (res && res.length > 0) {
        resolve({
          results: res,
        });
      }
      resolve({
        results: [],
      });
    } catch (e) {
      reject(e);
    }
  });
};
export const handleGetNewsByNewsId = async (news_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!news_id) {
        resolve("News Id is not null");
      }
      const res = await db.News.findOne({
        where: {
          news_id,
        },

        subQuery: false,
        raw: true,
        nest: true,
      });
      if (!res) {
        resolve("News does not exist");
      }
      resolve({
        results: res,
      });
    } catch (e) {
      reject(e);
    }
  });
};
export const handleAddNews = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let isCheck = true;

      if (isCheck) {
        const res = await db.News.create({
          news_id: uuidv4(),
          description:
            "Không ăn đủ rau xanh có thể gây ra nhiều tác hại nghiêm trọng cho sức khỏe. Rau xanh cung cấp các vitamin, khoáng chất và chất xơ cần thiết giúp duy trì hệ miễn dịch, tiêu hóa khỏe mạnh và ngăn ngừa táo bón. Thiếu rau xanh có thể dẫn đến thiếu hụt dinh dưỡng, tăng nguy cơ mắc bệnh mãn tính như tim mạch, tiểu đường và ung thư, cũng như ảnh hưởng tiêu cực đến sức khỏe tâm thần, gây ra căng thẳng và trầm cảm. Do đó, bổ sung rau xanh hàng ngày là rất quan trọng để duy trì sức khỏe toàn diện.",
          title: "Tác hại của việc không ăn rau xanh ",
          content: `       <h1>Tác hại của việc không ăn rau xanh</h1>
          <p>Rau xanh là nguồn cung cấp vitamin, khoáng chất và chất xơ quan trọng cho cơ thể. Việc không ăn đủ rau xanh có thể gây ra nhiều tác hại nghiêm trọng cho sức khỏe:</p>
          <ul>
              <li>
                  <strong>Thiếu chất dinh dưỡng:</strong> Rau xanh chứa nhiều vitamin như A, C, K và các khoáng chất như sắt, canxi. Thiếu hụt các chất này có thể dẫn đến suy giảm hệ miễn dịch, dễ mắc các bệnh nhiễm trùng và ảnh hưởng tiêu cực đến sự phát triển và chức năng của các cơ quan trong cơ thể. Ngoài ra, thiếu vitamin A có thể dẫn đến các vấn đề về thị lực, đặc biệt là nguy cơ mắc bệnh quáng gà.
              </li>
              <li>
                  <strong>Táo bón:</strong> Rau xanh là nguồn cung cấp chất xơ tự nhiên, giúp duy trì hệ tiêu hóa khỏe mạnh. Không ăn đủ rau xanh có thể gây ra táo bón, đau bụng, và các vấn đề về đường tiêu hóa khác như viêm đại tràng. Chất xơ giúp tăng cường nhu động ruột, giúp việc tiêu hóa dễ dàng hơn và ngăn ngừa tình trạng khó tiêu.
              </li>
              <li>
                  <strong>Tăng nguy cơ mắc bệnh mãn tính:</strong> Chế độ ăn thiếu rau xanh có thể làm tăng nguy cơ mắc các bệnh mãn tính như bệnh tim mạch, tiểu đường, và ung thư. Rau xanh chứa nhiều chất chống oxy hóa giúp bảo vệ cơ thể khỏi các gốc tự do gây hại. Các chất chống oxy hóa này có vai trò quan trọng trong việc giảm viêm, bảo vệ tế bào và ngăn ngừa sự phát triển của các bệnh mãn tính.
              </li>
              <li>
                  <strong>Ảnh hưởng đến sức khỏe tâm thần:</strong> Một số nghiên cứu đã chỉ ra rằng thiếu các chất dinh dưỡng từ rau xanh có thể ảnh hưởng tiêu cực đến sức khỏe tâm thần, gây ra căng thẳng, lo âu, và trầm cảm. Các vitamin và khoáng chất trong rau xanh đóng vai trò quan trọng trong việc duy trì chức năng não bộ khỏe mạnh. Đặc biệt, folate, một loại vitamin B có trong rau xanh, có liên quan mật thiết đến việc giảm nguy cơ trầm cảm và cải thiện tâm trạng.
              </li>
              <li>
                  <strong>Da dẻ kém tươi tắn:</strong> Rau xanh cung cấp nhiều chất chống oxy hóa và vitamin giúp làn da khỏe mạnh, tươi sáng. Thiếu rau xanh có thể làm da trở nên khô ráp, mất độ đàn hồi, và dễ bị tổn thương do các yếu tố môi trường. Các vitamin như vitamin C và E trong rau xanh giúp bảo vệ da khỏi các tác nhân gây hại và hỗ trợ quá trình tái tạo da.
              </li>
              <li>
                  <strong>Thừa cân và béo phì:</strong> Rau xanh thường có ít calo nhưng lại tạo cảm giác no, giúp kiểm soát cân nặng. Không ăn đủ rau xanh có thể dẫn đến thừa cân và béo phì do thiếu các chất xơ và các chất dinh dưỡng cần thiết cho sự cân bằng năng lượng. Thay vào đó, bạn có thể tiêu thụ nhiều thực phẩm giàu calo và ít dinh dưỡng, góp phần vào việc tăng cân không kiểm soát.
              </li>
              <li>
                  <strong>Tăng nguy cơ mắc bệnh tiểu đường:</strong> Thiếu chất xơ từ rau xanh có thể làm tăng nguy cơ mắc bệnh tiểu đường loại 2. Chất xơ giúp kiểm soát lượng đường trong máu bằng cách làm chậm quá trình hấp thụ đường từ thức ăn, giúp ngăn ngừa tình trạng đường huyết tăng cao đột ngột sau bữa ăn.
              </li>
              <li>
                  <strong>Giảm hiệu suất thể chất:</strong> Rau xanh cung cấp nhiều vi chất dinh dưỡng cần thiết cho sự hoạt động của cơ thể. Việc thiếu rau xanh trong chế độ ăn uống có thể dẫn đến mệt mỏi, thiếu năng lượng và giảm hiệu suất làm việc cũng như hoạt động thể thao. Các khoáng chất như sắt và magiê trong rau xanh giúp duy trì mức năng lượng và sự bền bỉ.
              </li>
          </ul>
          <p>Do đó, để duy trì một cơ thể khỏe mạnh và năng động, hãy đảm bảo bổ sung đủ rau xanh trong khẩu phần ăn hàng ngày của bạn. Một chế độ ăn uống cân bằng và đa dạng, bao gồm nhiều loại rau xanh, sẽ giúp bạn có được sức khỏe tốt và ngăn ngừa nhiều bệnh tật.</p>
          <p>Hãy nhớ rằng, rau xanh không chỉ là thực phẩm, mà còn là một phần quan trọng của lối sống lành mạnh. Hãy bắt đầu từ những thay đổi nhỏ như thêm rau vào bữa ăn sáng, trưa, và tối, và bạn sẽ cảm nhận được sự khác biệt trong sức khỏe và tinh thần của mình. Đừng quên, sự đa dạng trong loại rau xanh bạn tiêu thụ cũng rất quan trọng để cung cấp đầy đủ các chất dinh dưỡng khác nhau cho cơ thể.</p>
          <p>Hãy tạo thói quen ăn rau xanh ngay từ hôm nay để bảo vệ sức khỏe của chính bạn và gia đình. Sự lựa chọn thông minh trong ăn uống sẽ mang lại những lợi ích dài lâu, giúp bạn sống khỏe mạnh và hạnh phúc hơn.</p>`,
          imgPath:
            "https://image.tienphong.vn/w645/Uploaded/2024/rwbvhvobvvimsb/2022_07_11/rau-la-xanh-chumngay-7848.jpg",
        });
        if (!res) {
          resolve("create is fail");
        }
        resolve({
          results: "create is success",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
