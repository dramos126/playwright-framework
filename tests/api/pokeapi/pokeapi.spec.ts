import { expect, test } from '@playwright/test'
import { getJson } from '../../../utils/api'

test('Requesting an invalid pokemon returns 404', async ({ request }) => {
  const response = await request.get('/api/v2/pokemon/invalid-pokemon')
  expect(response.status()).toBe(404)
})

test('Get eevee evolution tree', async ({ request }) => {
  const eevee = await getJson(request, '/api/v2/pokemon/eevee')
  const speciesURL = await getJson(request, eevee.species.url)
  const evolutionURL = speciesURL.evolution_chain.url
  const evolutionChain = await getJson(request, evolutionURL)
  expect(evolutionChain.chain.evolves_to.length).toBe(8)
})

test('Get evolution tree for a pokemon with no evolutions', async ({ request }) => {
  const ditto = await getJson(request, '/api/v2/pokemon-species/ditto')
  const evolutionURL = ditto.evolution_chain.url
  const evolutionChain = await getJson(request, evolutionURL)
  expect(evolutionChain.chain.evolves_to.length).toBe(0)
})

test('Items repsponse matches schema', async ({ request }) => {
  const items = await getJson(request, '/api/v2/item/master-ball')
  expect(items).toMatchObject({
    id: expect.any(Number),
    name: expect.any(String),
    cost: expect.any(Number),
    attributes: expect.arrayContaining([
      expect.objectContaining({ name: expect.any(String), url: expect.any(String) })
    ]),
    category: {
      name: expect.any(String),
      url: expect.any(String),
    },
    effect_entries: expect.arrayContaining([
      expect.objectContaining({
        effect: expect.any(String),
        short_effect: expect.any(String),
        language: expect.objectContaining({ name: expect.any(String), url: expect.any(String) }),
      })
    ]),
    sprites: {
      default: expect.any(String),
    },
  })
})
