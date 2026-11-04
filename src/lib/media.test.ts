import { describe, expect, it } from 'vitest'
import { isDirectVideoFile, isSafeAssetUrl, resolveVideo, toVideoEmbed } from './media.ts'

describe('media urls', () => {
  it('allows site files and https assets only', () => {
    expect(isSafeAssetUrl('/photos/zach.jpg')).toBe(true)
    expect(isSafeAssetUrl('https://cdn.example.com/zach.jpg')).toBe(true)
    expect(isSafeAssetUrl('http://cdn.example.com/zach.jpg')).toBe(false)
    expect(isSafeAssetUrl('javascript:alert(1)')).toBe(false)
    expect(isSafeAssetUrl('//cdn.example.com/zach.jpg')).toBe(false)
  })

  it('detects direct video files', () => {
    expect(isDirectVideoFile('/video/intro.mp4')).toBe(true)
    expect(isDirectVideoFile('https://cdn.example.com/intro.mp4?v=2')).toBe(true)
    expect(isDirectVideoFile('https://cdn.example.com/intro.webm')).toBe(true)
    expect(isDirectVideoFile('https://youtu.be/abcdefghijk')).toBe(false)
  })

  it('normalizes youtube and vimeo embeds', () => {
    expect(toVideoEmbed('https://www.youtube.com/watch?v=abcdefghijk')?.src).toContain(
      'youtube-nocookie.com/embed/abcdefghijk',
    )
    expect(toVideoEmbed('https://youtu.be/abcdefghijk')?.provider).toBe('youtube')
    expect(toVideoEmbed('https://www.youtube.com/shorts/abcdefghijk')?.src).toContain('abcdefghijk')
    expect(toVideoEmbed('https://vimeo.com/123456')?.src).toBe(
      'https://player.vimeo.com/video/123456?autoplay=1',
    )
    expect(toVideoEmbed('https://player.vimeo.com/video/123456')?.provider).toBe('vimeo')
    expect(toVideoEmbed('http://youtu.be/abcdefghijk')).toBeNull()
    expect(toVideoEmbed('https://example.com/watch?v=abcdefghijk')).toBeNull()
  })

  it('prefers an mp4 over an embed when both are set', () => {
    expect(
      resolveVideo({
        mp4: '/video/intro.mp4',
        embedUrl: 'https://vimeo.com/123456',
        poster: '/photos/poster.jpg',
      }),
    ).toEqual({
      kind: 'file',
      src: '/video/intro.mp4',
      poster: '/photos/poster.jpg',
    })
  })

  it('returns an empty player when nothing valid is configured', () => {
    expect(resolveVideo({ mp4: '', embedUrl: '', poster: '' })).toEqual({ kind: 'empty' })
    expect(resolveVideo({ mp4: 'not a file', embedUrl: 'https://example.com/video', poster: '' })).toEqual({
      kind: 'empty',
    })
  })
})
