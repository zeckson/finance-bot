import { assertEquals } from '@std/assert'
import { rupees } from './rupiee.ts'

const nbsp = `\u00A0`

Deno.test(function print100Rupees() {
	assertEquals(
		rupees(100),
		`LKR${nbsp}100.00`,
	)
})
