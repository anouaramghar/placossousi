import fs from 'fs'
import path from 'path'

type JsonValue = string | number | boolean | null | JsonValue[] | { [k: string]: JsonValue }

function readMessages(file: string): Record<string, JsonValue> {
  const p = path.join(__dirname, '..', 'messages', file)
  return JSON.parse(fs.readFileSync(p, 'utf-8'))
}

/**
 * Recursively collect leaf-key paths from a nested message object.
 * Arrays are treated as leaves (next-intl loads them as arrays, not individually addressable).
 */
function flattenKeys(obj: JsonValue, prefix = ''): string[] {
  if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
    return prefix ? [prefix] : []
  }
  const out: string[] = []
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      out.push(...flattenKeys(value, next))
    } else {
      out.push(next)
    }
  }
  return out
}

/**
 * Collect every leaf path whose value is a string — used for empty-string detection.
 * Returns entries [path, value] so we can report which key is empty.
 */
function flattenStringLeaves(obj: JsonValue, prefix = ''): Array<[string, string]> {
  if (obj === null || typeof obj !== 'object') return []
  if (Array.isArray(obj)) {
    const out: Array<[string, string]> = []
    obj.forEach((item, i) => {
      if (typeof item === 'string') out.push([`${prefix}[${i}]`, item])
      else out.push(...flattenStringLeaves(item, `${prefix}[${i}]`))
    })
    return out
  }
  const out: Array<[string, string]> = []
  for (const [key, value] of Object.entries(obj)) {
    const next = prefix ? `${prefix}.${key}` : key
    if (typeof value === 'string') out.push([next, value])
    else if (typeof value === 'object' && value !== null) out.push(...flattenStringLeaves(value, next))
  }
  return out
}

describe('i18n key parity', () => {
  const fr = readMessages('fr.json')
  const ar = readMessages('ar.json')
  const frKeys = flattenKeys(fr).sort()
  const arKeys = flattenKeys(ar).sort()

  it('fr and ar have identical leaf-key paths', () => {
    const frSet = new Set(frKeys)
    const arSet = new Set(arKeys)
    const onlyInFr = frKeys.filter(k => !arSet.has(k))
    const onlyInAr = arKeys.filter(k => !frSet.has(k))

    if (onlyInFr.length || onlyInAr.length) {
      const msg = [
        'i18n key parity mismatch:',
        onlyInFr.length ? `  Present in fr, missing in ar (${onlyInFr.length}):\n    - ${onlyInFr.join('\n    - ')}` : '',
        onlyInAr.length ? `  Present in ar, missing in fr (${onlyInAr.length}):\n    - ${onlyInAr.join('\n    - ')}` : '',
      ].filter(Boolean).join('\n')
      throw new Error(msg)
    }

    expect(arKeys).toEqual(frKeys)
  })

  it('fr has no empty string leaf values', () => {
    const empties = flattenStringLeaves(fr).filter(([, v]) => v === '').map(([k]) => k)
    if (empties.length) {
      throw new Error(`fr.json has empty string values at:\n  - ${empties.join('\n  - ')}`)
    }
    expect(empties).toEqual([])
  })

  it('ar has no empty string leaf values', () => {
    const empties = flattenStringLeaves(ar).filter(([, v]) => v === '').map(([k]) => k)
    if (empties.length) {
      throw new Error(`ar.json has empty string values at:\n  - ${empties.join('\n  - ')}`)
    }
    expect(empties).toEqual([])
  })
})
