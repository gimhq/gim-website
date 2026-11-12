import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { copyFor } from '@/shared/i18n'
import { MultiHubSection } from './components/multi-hub-section'

describe('multi-hub section', () => {
  it('shows the four advantages, a hub that is down and a link to the docs', () => {
    render(<MultiHubSection copy={copyFor('en')} docsHref="/docs/servers/overview/" />)
    expect(screen.getByRole('heading', { name: 'One account, several hubs' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    expect(screen.getByText('hub.g.im')).toBeInTheDocument()
    expect(screen.getByText('a friend\'s hub · down')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'How hubs work' })).toHaveAttribute('href', '/docs/servers/overview/')
  })
})
