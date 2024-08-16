import { Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'nextjs-client',
  brokers: ['localhost:9092'], // Replace with your Kafka broker addresses
});

const consumer = kafka.consumer({ groupId: 'video-group' });

export const consumeMessages = async (topic, callback) => {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        value: message.value.toString(),
      });
      callback(message.value.toString());
    },
  });
};
