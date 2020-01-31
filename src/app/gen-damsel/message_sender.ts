// tslint:disable

import Int64 from "thrift-ts/lib/int64";

import * as base from "./base";
import * as domain from "./domain";
export type MessageAttachments = MessageAttachment[];
export interface MessageAttachment {
  name: string;
  mime_type?: string;
  data: string;
}

export interface MailBody {
  content_type?: string;
  text: string;
}

export interface MessageMail {
  mail_body: MailBody;
  subject?: string;
  from_email: string;
  to_emails: string[];
  attachments?: MessageAttachments;
}

export interface Message {
  message_mail?: MessageMail;
}
