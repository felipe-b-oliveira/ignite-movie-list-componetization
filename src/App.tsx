import { useEffect, useState } from 'react';
import { GenreResponseProps } from './types/interfaces';

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';

import { api } from './services/api';

import './styles/global.scss';
import './styles/content.scss';
import './styles/sidebar.scss';

export function App() {
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    useEffect(() => {
        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <SideBar selectedGenreId={selectedGenreId} handleClick={handleClickButton} />
            <Content selectedGenre={selectedGenre} selectedGenreId={selectedGenreId} />
        </div>
    )
}
