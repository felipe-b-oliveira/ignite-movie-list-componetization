import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { api } from '../services/api';
import { GenreResponseProps } from '../types/interfaces';
interface SideBarProps {
    selectedGenreId: number;
    /**
     * Tipagem de Função:
     * A função handleClick recebe um parâmetro do tipo [NUMBER] e não retorna 
     * nada [VOID]
     */
    handleClick: (id: number) => void;
}

export function SideBar(props: SideBarProps) {
    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    return (
        <nav className="sidebar">
            <span>Watch<p>Me</p></span>
            <div className="buttons-container">
                {genres.map(genre => (
                    <Button
                        key={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => props.handleClick(genre.id)}
                        selected={props.selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    )
}
