const supertest = require("supertest");
const { app } = require("../index");

// const app = servers;
describe("API tests", () => {
  describe("Public routes", () => {
    describe("Create drone route", () => {
      it("it should return 200 if drone was created successfully if the data was added correctly", async () => {
        const option = {
          model: "Hello world",
          weight: 200,
          battery_capacity: 100,
          state: "Good",
        };
        const { body, status } = await supertest(app)
          .post("/api/v1/mfbank/public/create-drone")
          .send(option);
        expect(body.status).toEqual("SUCCESS");
        expect(body.message).toEqual("Drone added successfully");
      });
    });

    describe("load drone with medications", () => {
      it("it should return 200 if drone was loaded successfully", async () => {
        const option = {
          drone_uuid: "b89606b2-cfb2-48f1-b573-089740cf4a1c",
          name: "ABEL1234_",
          weight: "200",
          code: "DANIELKENNETH",
          image: "www.cloudinary.com/hbdwbipuewchbd ",
        };

        const { body, statusCode } = await supertest(app)
          .post("/api/v1/mfbank/public/load-drone")
          .send(option);

        expect(statusCode).toBe(200);
        expect(body.message).toEqual("Medication added successfully");
      });
    });

    describe("Get All Medications in drone", () => {
      it("it should return 200 if all medications returned successfully", async () => {
        const pageNum = 1;
        const drone_uuid = "b89606b2-cfb2-48f1-b573-089740cf4a1c";

        const { body, statusCode } = await supertest(app).get(
          `/api/v1/mfbank/public/all-medications-in-drone?drone_uuid=${drone_uuid}&pageNum=${pageNum}`
        );

        expect(statusCode).toBe(200);
        expect(body.status).toEqual("SUCCESS");
      });
    });

    describe("Get All drones", () => {
      it("it should return 200 if all drones returned successfully", async () => {
        const pageNum = 1;

        const { body, statusCode } = await supertest(app).get(
          `/api/v1/mfbank/public/all-drones?pageNum=${pageNum}`
        );

        console.log({ body });

        expect(statusCode).toBe(200);
        expect(body.status).toEqual("SUCCESS");
      });
    });

    describe("Get drone battery level", () => {
      it("it should return 200 if drone battery level was returned successfully", async () => {
        const drone_uuid = "b89606b2-cfb2-48f1-b573-089740cf4a1c";

        const { body, statusCode } = await supertest(app).get(
          `/api/v1/mfbank/public/get-drone-battery-level?drone_uuid=${drone_uuid}`
        );

        console.log({ body });

        expect(statusCode).toBe(200);
        expect(body.status).toEqual("SUCCESS");
      });
    });

    // describe("add_business", () => {
    //   it("it should return 200 if successful", async () => {
    //     // expect(true).toBe(true)

    //     const option = {
    //       natureOf_biz: "Shipping",
    //       business_reg_num: "1234567890987654321",
    //       biz_tax_id: "wwww.cloudinary.com/res.kjo",
    //       country_of_incorporation: "Nigeria",
    //       incorporation_date: "11-20-1980",
    //       country_of_operation: "Nigeria",
    //       mobile: "+2349020269804",
    //       email: "abelkelly6022@gmail.com",
    //       otp: "123456",
    //     };
    //     // const jwt = "bfhjhgjhkmcsdscd"

    //     // await supertest(app).post("/api/jetwest/public/register").set("Authorization", `Bearer ${jwt}`).send("payload");

    //     // .post("/api/jetwest/public/register").send(user);

    //     const { body, statusCode } = await supertest(app)
    //       .post("/api/jetwest/public/add_business")
    //       .send(option);

    //     //   console.log({ token: body.success.token });

    //     // fs.writeFileSync("./tests/auth.txt", body.success.token);

    //     //   console.log({ body, statusCode });
    //     // code = body.otp

    //     expect(statusCode).toBe(200);
    //     expect(body.success.message).toEqual(
    //       "business data added successfully"
    //     );
    //   });
    // });

    // describe("update_business_compliance", () => {
    //   it("it should return 200 if successful", async () => {
    //     // expect(true).toBe(true)

    //     const option = {
    //       incoporation_doc_url: "www.cloudinary.com/resjhwhk",
    //       proofOf_biz_address_url: "www.cloudinary.com/resjhwhkhewiciujwck",
    //       guarantor_form_url: "www.cloudinary.com/resjhwhkiucwucndc",
    //       shareHolder_register_url: "www.cloudinary.com/resjhwhkshcwiuciwecoe",
    //       artOf_association: "www.cloudinary.com/resjhwhkkjrjfjifnewflebkf",
    //       memorandumOf_guidance_url: "www.cloudinary.com/resjhwhkmnbcjlcwc",
    //       email: "abelkelly6022@gmail.com",
    //     };
    //     // const jwt = "bfhjhgjhkmcsdscd"

    //     // await supertest(app).post("/api/jetwest/public/register").set("Authorization", `Bearer ${jwt}`).send("payload");

    //     // .post("/api/jetwest/public/register").send(user);

    //     const { body, statusCode } = await supertest(app)
    //       .post("/api/jetwest/public/update_business_compliance")
    //       .send(option);

    //     //   console.log({ token: body.success.token });

    //     // fs.writeFileSync("./tests/auth.txt", body.success.token);

    //     //   console.log({ body, statusCode });
    //     // code = body.otp

    //     expect(statusCode).toBe(200);
    //     expect(body.success.message).toEqual(
    //       "Business updated successfully; an email would be sent to your business email when the documents have been reviewed, Thanks."
    //     );
    //   });
    // });
  });
});
