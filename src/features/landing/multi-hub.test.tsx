import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { copyFor } from '@/shared/i18n'
import { MultiHubSection } from './components/multi-hub-section'

describe('multi-hub section', () => {
  it('shows the flow between two users\' hubs, the four advantages and a link to the docs', () => {
    render(<MultiHubSection copy={copyFor('en')} docsHref="/docs/servers/overview/" />)
    expect(screen.getByRole('heading', { name: 'One account, several hubs' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4)
    // Desktop and mobile layouts are both in the document; CSS shows one.
    expect(screen.getAllByRole('img', { name: /Alice reaches Bob/ })).toHaveLength(2)
    expect(screen.getAllByText('hub.g.im')).toHaveLength(2)
    expect(screen.getAllByText('Bob\'s hub · down')).toHaveLength(2)
    expect(screen.getAllByRole('listitem')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'How hubs work' })).toHaveAttribute('href', '/docs/servers/overview/')
  })
})
