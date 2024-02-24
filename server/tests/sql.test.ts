import execute from "../src/services/sql.service";
describe("Test DB Connection", () => {

  test("Should return a result", async () => {
    const query = "SELECT * FROM Users LIMIT 3;"
    const results: any[] = await execute(query)
        expect(results.length).toBeGreaterThan(0);
  });
        });
