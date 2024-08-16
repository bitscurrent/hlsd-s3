import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nextjs-client',
  brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
});

const producer = kafka.producer();

export const sendMessage = async (topic, message) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [
      { value: message },
    ],
  });
  await producer.disconnect();
};
