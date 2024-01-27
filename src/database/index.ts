import { MongoClient, ServerApiVersion } from "mongodb";
import { env } from "src/constants/env";

export async function createClient() {
	return new MongoClient(env.MONGODB_URL, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true,
		},
		maxPoolSize: 1,
	});
}

export async function connectClient(client: MongoClient) {
	await client.connect();
}

export async function disconnectClient(client?: MongoClient) {
	if (!client) {
		const client_ = await createClient();
		await client_.close();
	} else {
		await client.close();
	}
}

export const getDatabase = async (client?: MongoClient) => {
	let client_ = client;

	if (!client) {
		client_ = await createClient();
		await connectClient(client_);
		return client_.db(env.DB_NAME);
	}

	return client.db(env.DB_NAME);
};
