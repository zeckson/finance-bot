import KvKey = Deno.KvKey

export class DenoStore {
	constructor(private db: Deno.Kv) {
	}

	async save(key: KvKey, data: object): Promise<boolean> {
		const result = await this.db.set(key, data)
		return result.ok
	}

	async load(key: string): Promise<object> {
		const result = await this.db.get([key])
		return result.value as object
	}

	close() {
		this.db.close()
	}
}
