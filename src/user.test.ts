import userRegistrationController from "./controller/UserRegistrationController";
describe("User Controller", () => {
  it("Start Name testing case", async () => {
    let name = "Sharjeel";
      expect(userRegistrationController.tempFun(name)).toBe("Sharjeels");
  });
});
