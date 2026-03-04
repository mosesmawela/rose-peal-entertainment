import { ImageResponse } from 'next/og'

export const runtime = 'edge'

// Image metadata
export const alt = 'Rose Pearl Entertainment'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

// Image generation
export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'linear-gradient(to bottom right, #333, #000)',
                        padding: '40px',
                        borderRadius: '20px',
                        border: '1px solid #333',
                        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
                        width: '90%',
                        height: '80%',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            fontSize: 80,
                            fontWeight: 800,
                            letterSpacing: '-0.05em',
                            marginBottom: 20,
                            backgroundImage: 'linear-gradient(90deg, #fff, #888)',
                            backgroundClip: 'text',
                            color: 'transparent',
                        }}
                    >
                        ROSE PEARL
                    </div>
                    <div
                        style={{
                            fontSize: 40,
                            fontWeight: 300,
                            letterSpacing: '0.2em',
                            color: '#ccc',
                            textTransform: 'uppercase'
                        }}
                    >
                        Entertainment
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
