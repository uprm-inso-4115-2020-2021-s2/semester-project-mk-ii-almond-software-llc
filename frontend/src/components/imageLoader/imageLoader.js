import { React, useState } from "react";
import AMPhibianFrontImage from '../../assets/monsters/AMPhibian/front.png';
import AMPhibianBackImage from '../../assets/monsters/AMPhibian/back.png';
import CioFrontImage from '../../assets/monsters/Cio/front.png';
import CioBackImage from '../../assets/monsters/Cio/back.png';
import HatrickFrontImage from '../../assets/monsters/Hatrick/front.png';
import HatrickBackImage from '../../assets/monsters/Hatrick/back.png';
import NailgunFrontImage from '../../assets/monsters/Nailgun/front.png';
import NailgunBackImage from '../../assets/monsters/Nailgun/back.png';
import SheetfaceFrontImage from '../../assets/monsters/Sheetface/front.png';
import SheetfaceBackImage from '../../assets/monsters/Sheetface/back.png';
import SullivanFrontImage from '../../assets/monsters/Sullivan/front.png';
import SullivanBackImage from '../../assets/monsters/Sullivan/back.png';
import TachleFrontImage from '../../assets/monsters/Tachle/front.png';
import TachleBackImage from '../../assets/monsters/Tachle/back.png';
import TheafFrontImage from '../../assets/monsters/Theaf/front.png';
import TheafBackImage from '../../assets/monsters/Theaf/back.png';
import G0DFrontImage from '../../assets/monsters/G.0D/front.png';
import G0DBackImage from '../../assets/monsters/G.0D/back.png';

export default function ImageLoader(props) {

    const [images] = useState({
        AMPhibian: { front: AMPhibianFrontImage, back: AMPhibianBackImage },
        Cio: { front: CioFrontImage, back: CioBackImage },
        Hatrick: { front: HatrickFrontImage, back: HatrickBackImage },
        Nailgun: { front: NailgunFrontImage, back: NailgunBackImage },
        Sheetface: { front: SheetfaceFrontImage, back: SheetfaceBackImage },
        Sullivan: { front: SullivanFrontImage, back: SullivanBackImage },
        Tachle: { front: TachleFrontImage, back: TachleBackImage },
        Theaf: { front: TheafFrontImage, back: TheafBackImage },
        Pistachy: { front: TachleFrontImage, back: TachleBackImage },
        'G.0D': { front: G0DFrontImage, back: G0DBackImage },
    });

    return (
        <img src={images[props.name][props.side]} alt={props.name} />
    )
}