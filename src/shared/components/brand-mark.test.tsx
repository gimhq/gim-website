import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandIcon } from './brand-mark'

describe('brandIcon', () => {
  it('gives every instance its own gradient, so header and footer marks both fill', () => {
    const { container } = render(
      <>
        <BrandIcon />
        <BrandIcon />
      </>,
    )
    const ids = [...container.querySelectorAll('linearGradient')].map(g => g.id)
    const fills = [...container.querySelectorAll('path')].map(p => p.getAttribute('fill'))
    expect(new Set(ids).size).toBe(2)
    expect(fills).toEqual(ids.map(id => `url(#${id})`))
  })
})
