import React from "react";
import background from "@/assets/bg_contact.jpg";
import { IoHome } from "react-icons/io5";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Button, Form, Input } from "antd";

const Banner = () => {
  return (
    <div className="overflow-hidden relative whitespace-nowrap w-full h-screen">
      <img
        className="absolute inset-0 w-screen h-screen object-cover"
        src={background.src}
        alt="background"
      />
      <div className="absolute inset-0 bg-black opacity-40"></div>
      <div className="absolute inset-0 flex flex-col justify-center items-center">
        <p className="mb-20 select-none text-white text-4xl font-bold">
          Contact Us
        </p>
        <div className="flex lg:w-2/3 w-full">
          <div className="w-full max-w-xl flex flex-col gap-5">
            <div className="flex gap-3">
              <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                <IoHome size={24} />
              </div>
              <div className="flex flex-col">
                <p className="select-none text-blue-400 font-bold text-lg">
                  Address
                </p>
                <p className="text-white break-words">
                  123 Maple Street, Springfield, IL 62701, United States
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                <FaPhone size={24} />
              </div>
              <div className="flex flex-col">
                <p className="select-none text-blue-400 font-bold text-lg">
                  Phone
                </p>
                <p className="text-white">+1 (555) 555-5555</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="border-2 rounded-full w-16 h-16 bg-white flex items-center justify-center">
                <MdEmail size={24} />
              </div>
              <div className="flex flex-col">
                <p className="select-none text-blue-400 font-bold text-lg">
                  Email
                </p>
                <p className="text-white">contact@example.com</p>
              </div>
            </div>
          </div>
          <div className="w-1/2 border-2 rounded-lg drop-shadow-lg bg-white p-3">
            <p className="font-bold text-xl ">Send Message</p>
            <Form layout="vertical" className="mt-2">
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input full name",
                  },
                ]}
                label="Full name"
                name="fullName"
              >
                <Input placeholder="Full name" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input email",
                  },
                ]}
                label="Email"
                name="email"
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please input message",
                  },
                ]}
                label="Message"
                name="message"
              >
                <Input placeholder="Type your message..." />
              </Form.Item>
              <Form.Item>
                <Button className="w-full" type="primary" htmlType="submit">
                  Send
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
