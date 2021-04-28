import { React, useState } from "react";
import AMPhibianFrontImage from '../../assets/monsters/AMPhibian/front.png';
import AMPhibianBackImage from '../../assets/monsters/AMPhibian/back.png';
import AMPhibianIconImage from '../../assets/monsters/AMPhibian/icon.png';
import CioFrontImage from '../../assets/monsters/Cio/front.png';
import CioBackImage from '../../assets/monsters/Cio/back.png';
import CioIconImage from '../../assets/monsters/Cio/icon.png';
import HatrickFrontImage from '../../assets/monsters/Hatrick/front.png';
import HatrickBackImage from '../../assets/monsters/Hatrick/back.png';
import HatrickIconImage from '../../assets/monsters/Hatrick/icon.png';
import NailgunFrontImage from '../../assets/monsters/Nailgun/front.png';
import NailgunBackImage from '../../assets/monsters/Nailgun/back.png';
import NailgunIconImage from '../../assets/monsters/Nailgun/icon.png';
import SheepfaceFrontImage from '../../assets/monsters/Sheepface/front.png';
import SheepfaceBackImage from '../../assets/monsters/Sheepface/back.png';
import SheepfaceIconImage from '../../assets/monsters/Sheepface/icon.png';
import SullivanFrontImage from '../../assets/monsters/Sullivan/front.png';
import SullivanBackImage from '../../assets/monsters/Sullivan/back.png';
import SullivanIconImage from '../../assets/monsters/Sullivan/icon.png';
import TachleFrontImage from '../../assets/monsters/Tachle/front.png';
import TachleBackImage from '../../assets/monsters/Tachle/back.png';
import TachleIconImage from '../../assets/monsters/Tachle/icon.png';
import TheafFrontImage from '../../assets/monsters/Theaf/front.png';
import TheafBackImage from '../../assets/monsters/Theaf/back.png';
import TheafIconImage from '../../assets/monsters/Theaf/icon.png';
import G0DFrontImage from '../../assets/monsters/G.0D/front.png';
import G0DBackImage from '../../assets/monsters/G.0D/back.png';
import G0DIconImage from '../../assets/monsters/G.0D/icon.png';
import PistachyFrontImage from '../../assets/monsters/Pistachy/front.png';
import PistachyBackImage from '../../assets/monsters/Pistachy/back.png';
import PistachyIconImage from '../../assets/monsters/Pistachy/icon.png';

export default function ImageLoader(props) {

    const [images] = useState({
        AMPhibian: { front: AMPhibianFrontImage, back: AMPhibianBackImage, icon: AMPhibianIconImage },
        Cio: { front: CioFrontImage, back: CioBackImage, icon: CioIconImage },
        Hatrick: { front: HatrickFrontImage, back: HatrickBackImage, icon: HatrickIconImage },
        Nailgun: { front: NailgunFrontImage, back: NailgunBackImage, icon: NailgunIconImage },
        Sheepface: { front: SheepfaceFrontImage, back: SheepfaceBackImage, icon: SheepfaceIconImage },
        Sullivan: { front: SullivanFrontImage, back: SullivanBackImage, icon: SullivanIconImage },
        Tachle: { front: TachleFrontImage, back: TachleBackImage, icon: TachleIconImage },
        Theaf: { front: TheafFrontImage, back: TheafBackImage, icon: TheafIconImage },
        Pistachy: { front: PistachyFrontImage, back: PistachyBackImage, icon: PistachyIconImage },
        'G.0D': { front: G0DFrontImage, back: G0DBackImage, icon: G0DIconImage },
    });

    return (
        <img src={images[props.name][props.side]} alt={props.name}/>
    )
}