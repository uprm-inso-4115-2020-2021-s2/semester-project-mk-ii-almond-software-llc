import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import DeleteIcon from "@material-ui/icons/Delete";
import axios from "axios";
import { useHistory } from "react-router";

const Lootbox = () => {
	const [lootcrate, setLootcrate] = useState("");
	const [newItem, setNewItem] = useState([]);
	const [monsterID, setMonsterID] = useState("");
	const [monsters, setMonsters] = useState([]);
	let history = useHistory();

	const postLootCrate = async () => {
		await axios({
			method: "post",
			url: "http://localhost:8080/api/lootbox/add",
			data: {
				ID: lootcrate,
				Monsters: monsters,
			},
		});
		history.push("/lootCrateForm");
	};

	const firstEvent = (event) => {
		setLootcrate(event.target.value);
	};

	const secondEvent = () => {
		setNewItem((prev) => {
			return [...prev, lootcrate];
		});

		setLootcrate("");
		postLootCrate();
	};

	const thirdEvent = () => {
		setNewItem([]);
	};

	const setMonsterIDEvent = (event) => {
		setMonsterID(event.target.value);
	};

	const addMonsters = () => {
		setMonsters((prev) => {
			return [...prev, monsterID];
		});

		setMonsterID("");
	};

	const setMonstersEvent = () => {
		setNewItem([]);
	};

	return (
		<div>
			<br />
			<br />
			<div>
				<input
					type="text"
					value={lootcrate}
					placeholder="Add a Lootcrate"
					onChange={firstEvent}
				/>
				<Button onClick={secondEvent}>
					<AddIcon />
				</Button>
				<br />
				<br />
				<ul>
					{newItem.map((val) => {
						return <li> {val} </li>;
					})}
				</ul>
			</div>
			<br />
			<br />
			<div>
				<input
					type="text"
					value={monsterID}
					placeholder="Add Monsters"
					onChange={setMonsterIDEvent}
				/>
				<Button onClick={addMonsters}>
					<AddIcon />
				</Button>
				<br />
				<br />
				<ul>
					{monsters.map((val) => {
						return <li> {val} </li>;
					})}
				</ul>
			</div>

			<div>
				<Button onClick={(setMonstersEvent, thirdEvent)}>
					<DeleteIcon />
					Delete All
				</Button>
			</div>
		</div>
	);
};

export default Lootbox;
