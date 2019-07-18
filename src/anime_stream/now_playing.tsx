import React, { Component, RefObject, createRef } from 'react';
import styled from 'styled-components';

export interface NowPlayingProps {
    title: string;
    thumbnail: string;
    videoURL: string;
}

interface NowPlayingState {
    playing: boolean;
}

export default class extends Component<NowPlayingProps, NowPlayingState> {
    private video: RefObject<HTMLVideoElement> = createRef();

    constructor(props) {
        super(props);
    }

    render() {
        const Wrapper = styled.div`
        background-image: url('${this.props.thumbnail}');
        background-size: cover;
        height: 100%;
        padding: 1em;
        `;

        return (
            <Wrapper>
                <video
                    controls
                    ref={this.video}
                    src={this.props.videoURL}
                    style={{height: 'auto', width: '100%'}}
                />
            </Wrapper>
        );
    }
}