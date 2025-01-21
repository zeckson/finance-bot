import KvEntryMaybe = Deno.KvEntryMaybe
import KvKey = Deno.KvKey

export class DenoStore {
	constructor(private db: Deno.Kv) {
	}

	async save(key: KvKey, data: object): Promise<boolean> {
		const result = await this.db.set(key, data)
		return result.ok
	}

	async load(key: KvKey): Promise<KvEntryMaybe<object>> {
		return await this.db.get(key)
	}

	close() {
		this.db.close()
	}
}
