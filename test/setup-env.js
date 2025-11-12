process.env.FIREBASE_SERVICE_ACCOUNT_JSON = JSON.stringify({
  type: "service_account",
  project_id: "test-project",
  private_key_id: "test",
  private_key: "-----BEGIN PRIVATE KEY-----\\nTEST\\n-----END PRIVATE KEY-----\\n",
  client_email: "test@test.iam.gserviceaccount.com",
  client_id: "123",
  token_uri: "https://oauth2.googleapis.com/token"
});
process.env.FIREBASE_WEB_API_KEY = "test-api-key";
process.env.PORT = "0";
jest.setTimeout(10000);
