import Twilio from "twilio/lib/rest/Twilio";

export class TwilioDataSource {
  private client;
  private telNo;

  constructor(
    client: Twilio,
    options: {
      telNo: string;
    }
  ) {
    this.client = client;
    this.telNo = options.telNo;
  }
  async createCall(message: string, recipient: string) {
    return await this.client.calls.create({
      twiml: `<Response><Say>${message}</Say></Response>`,
      to: recipient,
      from: this.telNo,
    });
  }
}
