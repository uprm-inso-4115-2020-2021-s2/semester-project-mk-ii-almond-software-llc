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
	const [amount, setAmount] = useState(0);
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
		setMonsters([]);
	};

	const setMonsterIDEvent = (event) => {
		setMonsterID(event.target.value);
	};

	const loop = () => {
		for (let index = 0; index < amount; index++) {
			addMonsters();
		}
	};
	const addAmount = (event) => {
		setAmount(event.target.value);
	};

	const addMonsters = () => {
		setMonsters((prev) => {
			return [...prev, monsterID];
		});

		setMonsterID("");
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
				<Button onClick={loop}>
					<AddIcon />
				</Button>
				<input
					type="number"
					value={amount}
					placeholder="amount of monsters"
					onChange={addAmount}
				/>
				<br />
				<br />
				<ul>
					{monsters.map((val) => {
						return <li> {val} </li>;
					})}
				</ul>
			</div>

			<div>
				<Button onClick={thirdEvent}>
					<DeleteIcon />
					Delete All
				</Button>
			</div>
		</div>
	);
};

export default Lootbox;
