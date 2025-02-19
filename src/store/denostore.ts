import KvEntry = Deno.KvEntry
import KvEntryMaybe = Deno.KvEntryMaybe
import KvKey = Deno.KvKey
import KvListSelector = Deno.KvListSelector

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

	async list(selector: KvListSelector): Promise<KvEntry<object>[]> {
		return await Array.fromAsync(this.db.list(selector))
	}

	close() {
		this.db.close()
	}
}
