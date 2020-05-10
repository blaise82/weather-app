export class Temperature {
	constructor(temp, unit) {
		this.temp = temp;
		this.unit = unit;
	}

	CtoF(c) {
		return c * 9 / 5 + 32;
	}

	FtoC(f) {
		return (f - 32) * 5 / 9;
	}

	switch() {
		if (this.unit === 'C') {
			this.temp = this.CtoF(this.temp);
			this.unit = 'F';
		} else {
			this.temp = this.FtoC(this.temp);
			this.unit = 'C';
		}
	}

	getTemp() {
		return this.temp;
	}

	getUnit() {
		return this.unit;
	}
}
