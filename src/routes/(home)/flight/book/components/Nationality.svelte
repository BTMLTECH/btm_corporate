<script lang="ts">
	export let index: string | undefined = undefined;
	export let error: boolean | undefined = undefined;
	export let onInput: (
		e: Event & {
			currentTarget: EventTarget & HTMLSelectElement;
		}
	) => void;
</script>

<select
	on:input={(e) => {
		onInput(e);
	}}
	name="nationality-{index ?? 1}"
	class="w-full border {error
		? 'border-red-500'
		: 'border-neutral-300'} bg-neutral-100 px-4 py-2 text-sm focus:outline-none"
	id="nationality"
	required
>
	<option value="" label="Select a country ... " selected={true}>Select a country ... </option>
	<optgroup id="country-optgroup-Africa" label="Africa">
		<option value="Algerian" label="Algeria">Algeria</option>
		<option value="Angolan" label="Angola">Angola</option>
		<option value="Beninese" label="Benin">Benin</option>
		<option value="Botswanan" label="Botswana">Botswana</option>
		<option value="Burkinabé" label="Burkina Faso">Burkina Faso</option>
		<option value="Burundian" label="Burundi">Burundi</option>
		<option value="Cameroonian" label="Cameroon">Cameroon</option>
		<option value="Cape Verdean" label="Cape Verde">Cape Verde</option>
		<option value="Central African" label="Central African Republic"
			>Central African Republic</option
		>
		<option value="Chadian" label="Chad">Chad</option>
		<option value="Comorian" label="Comoros">Comoros</option>
		<option value="Congolese" label="Congo - Brazzaville">Congo - Brazzaville</option>
		<option value="Congolese" label="Congo - Kinshasa">Congo - Kinshasa</option>
		<option value="Ivorian" label="Côte d’Ivoire">Côte d’Ivoire</option>
		<option value="Djiboutian" label="Djibouti">Djibouti</option>
		<option value="Egyptian" label="Egypt">Egypt</option>
		<option value="Equatorial Guinean" label="Equatorial Guinea">Equatorial Guinea</option>
		<option value="Eritrean" label="Eritrea">Eritrea</option>
		<option value="Ethiopian" label="Ethiopia">Ethiopia</option>
		<option value="Gabonese" label="Gabon">Gabon</option>
		<option value="Gambian" label="Gambia">Gambia</option>
		<option value="Ghanaian" label="Ghana">Ghana</option>
		<option value="Guinean" label="Guinea">Guinea</option>
		<option value="Bissau-Guinean" label="Guinea-Bissau">Guinea-Bissau</option>
		<option value="Kenyan" label="Kenya">Kenya</option>
		<option value="Basotho" label="Lesotho">Lesotho</option>
		<option value="Liberian" label="Liberia">Liberia</option>
		<option value="Libyan" label="Libya">Libya</option>
		<option value="Malagasy" label="Madagascar">Madagascar</option>
		<option value="Malawian" label="Malawi">Malawi</option>
		<option value="Malian" label="Mali">Mali</option>
		<option value="Mauritanian" label="Mauritania">Mauritania</option>
		<option value="Mauritian" label="Mauritius">Mauritius</option>
		<option value="Mahoran" label="Mayotte">Mayotte</option>
		<option value="Moroccan" label="Morocco">Morocco</option>
		<option value="Mozambican" label="Mozambique">Mozambique</option>
		<option value="Namibian" label="Namibia">Namibia</option>
		<option value="Nigerien" label="Niger">Niger</option>
		<option value="Nigerian" label="Nigeria">Nigeria</option>
		<option value="Rwandan" label="Rwanda">Rwanda</option>
		<option value="Réunionese" label="Réunion">Réunion</option>
		<option value="Saint Helenian" label="Saint Helena">Saint Helena</option>
		<option value="Senegalese" label="Senegal">Senegal</option>
		<option value="Seychellois" label="Seychelles">Seychelles</option>
		<option value="Sierra Leonean" label="Sierra Leone">Sierra Leone</option>
		<option value="Somali" label="Somalia">Somalia</option>
		<option value="South African" label="South Africa">South Africa</option>
		<option value="Sudanese" label="Sudan">Sudan</option>
		<option value="Swazi" label="Swaziland">Swaziland</option>
		<option value="São Toméan" label="São Tomé and Príncipe">São Tomé and Príncipe</option>
		<option value="Tanzanian" label="Tanzania">Tanzania</option>
		<option value="Togolese" label="Togo">Togo</option>
		<option value="Tunisian" label="Tunisia">Tunisia</option>
		<option value="Ugandan" label="Uganda">Uganda</option>
		<option value="Sahrawi" label="Western Sahara">Western Sahara</option>
		<option value="Zambian" label="Zambia">Zambia</option>
		<option value="Zimbabwean" label="Zimbabwe">Zimbabwe</option>
	</optgroup>
	<optgroup id="country-optgroup-Americas" label="Americas">
		<option value="Anguillan" label="Anguilla">Anguilla</option>
		<option value="Antiguan or Barbudan" label="Antigua and Barbuda">Antigua and Barbuda</option>
		<option value="Argentinian" label="Argentina">Argentina</option>
		<option value="Aruban" label="Aruba">Aruba</option>
		<option value="Bahamian" label="Bahamas">Bahamas</option>
		<option value="Barbadian" label="Barbados">Barbados</option>
		<option value="Belizean" label="Belize">Belize</option>
		<option value="Bermudian" label="Bermuda">Bermuda</option>
		<option value="Bolivian" label="Bolivia">Bolivia</option>
		<option value="Brazilian" label="Brazil">Brazil</option>
		<option value="British Virgin Islander" label="British Virgin Islands"
			>British Virgin Islands</option
		>
		<option value="Canadian" label="Canada">Canada</option>
		<option value="Caymanian" label="Cayman Islands">Cayman Islands</option>
		<option value="Chilean" label="Chile">Chile</option>
		<option value="Colombian" label="Colombia">Colombia</option>
		<option value="Costa Rican" label="Costa Rica">Costa Rica</option>
		<option value="Cuban" label="Cuba">Cuba</option>
		<option value="Dominican" label="Dominica">Dominica</option>
		<option value="Dominican" label="Dominican Republic">Dominican Republic</option>
		<option value="Ecuadorian" label="Ecuador">Ecuador</option>
		<option value="Salvadoran" label="El Salvador">El Salvador</option>
		<option value="Falkland Islander" label="Falkland Islands">Falkland Islands</option>
		<option value="French Guianan" label="French Guiana">French Guiana</option>
		<option value="Greenlander" label="Greenland">Greenland</option>
		<option value="Grenadian" label="Grenada">Grenada</option>
		<option value="Guadeloupean" label="Guadeloupe">Guadeloupe</option>
		<option value="Guatemalan" label="Guatemala">Guatemala</option>
		<option value="Guyanese" label="Guyana">Guyana</option>
		<option value="Haitian" label="Haiti">Haiti</option>
		<option value="Honduran" label="Honduras">Honduras</option>
		<option value="Jamaican" label="Jamaica">Jamaica</option>
		<option value="Martinican" label="Martinique">Martinique</option>
		<option value="Mexican" label="Mexico">Mexico</option>
		<option value="Montserratian" label="Montserrat">Montserrat</option>
		<option value="Dutch Antillean" label="Netherlands Antilles">Netherlands Antilles</option>
		<option value="Nicaraguan" label="Nicaragua">Nicaragua</option>
		<option value="Panamanian" label="Panama">Panama</option>
		<option value="Paraguayan" label="Paraguay">Paraguay</option>
		<option value="Peruvian" label="Peru">Peru</option>
		<option value="Puerto Rican" label="Puerto Rico">Puerto Rico</option>
		<option value="Saint Barthélemian" label="Saint Barthélemy">Saint Barthélemy</option>
		<option value="Kittitian or Nevisian" label="Saint Kitts and Nevis"
			>Saint Kitts and Nevis</option
		>
		<option value="Saint Lucian" label="Saint Lucia">Saint Lucia</option>
		<option value="Saint-Martinoise" label="Saint Martin">Saint Martin</option>
		<option value="Saint-Pierrais or Miquelonnais" label="Saint Pierre and Miquelon"
			>Saint Pierre and Miquelon</option
		>
		<option value="Saint Vincentian" label="Saint Vincent and the Grenadines"
			>Saint Vincent and the Grenadines</option
		>
		<option value="Surinamese" label="Suriname">Suriname</option>
		<option value="Trinidadian or Tobagonian" label="Trinidad and Tobago"
			>Trinidad and Tobago</option
		>
		<option value="Turks and Caicos Islander" label="Turks and Caicos Islands"
			>Turks and Caicos Islands</option
		>
		<option value="Virgin Islander" label="U.S. Virgin Islands">U.S. Virgin Islands</option>
		<option value="American" label="United States">United States</option>
		<option value="Uruguayan" label="Uruguay">Uruguay</option>
		<option value="Venezuelan" label="Venezuela">Venezuela</option>
	</optgroup>
	<optgroup id="country-optgroup-Asia" label="Asia">
		<option value="Afghan" label="Afghanistan">Afghanistan</option>
		<option value="Armenian" label="Armenia">Armenia</option>
		<option value="Azerbaijani" label="Azerbaijan">Azerbaijan</option>
		<option value="Bahraini" label="Bahrain">Bahrain</option>
		<option value="Bangladeshi" label="Bangladesh">Bangladesh</option>
		<option value="Bhutanese" label="Bhutan">Bhutan</option>
		<option value="Bruneian" label="Brunei">Brunei</option>
		<option value="Cambodian" label="Cambodia">Cambodia</option>
		<option value="Chinese" label="China">China</option>
		<option value="Georgian" label="Georgia">Georgia</option>
		<option value="Hong Konger" label="Hong Kong SAR China">Hong Kong SAR China</option>
		<option value="Indian" label="India">India</option>
		<option value="Indonesian" label="Indonesia">Indonesia</option>
		<option value="Iranian" label="Iran">Iran</option>
		<option value="Iraqi" label="Iraq">Iraq</option>
		<option value="Israeli" label="Israel">Israel</option>
		<option value="Japanese" label="Japan">Japan</option>
		<option value="Jordanian" label="Jordan">Jordan</option>
		<option value="Kazakhstani" label="Kazakhstan">Kazakhstan</option>
		<option value="Kuwaiti" label="Kuwait">Kuwait</option>
		<option value="Kyrgyzstani" label="Kyrgyzstan">Kyrgyzstan</option>
		<option value="Laotian" label="Laos">Laos</option>
		<option value="Lebanese" label="Lebanon">Lebanon</option>
		<option value="Macanese" label="Macau SAR China">Macau SAR China</option>
		<option value="Malaysian" label="Malaysia">Malaysia</option>
		<option value="Maldivian" label="Maldives">Maldives</option>
		<option value="Mongolian" label="Mongolia">Mongolia</option>
		<option value="Burmese" label="Myanmar [Burma]">Myanmar [Burma]</option>
		<option value="Nepalese" label="Nepal">Nepal</option>
		<option value="Neutral" label="Neutral Zone">Neutral Zone</option>
		<option value="North Korean" label="North Korea">North Korea</option>
		<option value="Omani" label="Oman">Oman</option>
		<option value="Pakistani" label="Pakistan">Pakistan</option>
		<option value="Palestinian" label="Palestinian Territories">Palestinian Territories</option>
		<option value="Yemeni" label="People's Democratic Republic of Yemen"
			>People's Democratic Republic of Yemen</option
		>
		<option value="Filipino" label="Philippines">Philippines</option>
		<option value="Qatari" label="Qatar">Qatar</option>
		<option value="Saudi" label="Saudi Arabia">Saudi Arabia</option>
		<option value="Singaporean" label="Singapore">Singapore</option>
		<option value="South Korean" label="South Korea">South Korea</option>
		<option value="Sri Lankan" label="Sri Lanka">Sri Lanka</option>
		<option value="Syrian" label="Syria">Syria</option>
		<option value="Taiwanese" label="Taiwan">Taiwan</option>
		<option value="Tajikistani" label="Tajikistan">Tajikistan</option>
		<option value="Thai" label="Thailand">Thailand</option>
		<option value="Timorese" label="Timor-Leste">Timor-Leste</option>
		<option value="Turkish" label="Turkey">Turkey</option>
		<option value="Turkmen" label="Turkmenistan">Turkmenistan</option>
		<option value="Emirati" label="United Arab Emirates">United Arab Emirates</option>
		<option value="Uzbekistani" label="Uzbekistan">Uzbekistan</option>
		<option value="Vietnamese" label="Vietnam">Vietnam</option>
		<option value="Yemeni" label="Yemen">Yemen</option>
	</optgroup>
	<optgroup id="country-optgroup-Europe" label="Europe">
		<option value="Albanian" label="Albania">Albania</option>
		<option value="Andorran" label="Andorra">Andorra</option>
		<option value="Austrian" label="Austria">Austria</option>
		<option value="Belarusian" label="Belarus">Belarus</option>
		<option value="Belgian" label="Belgium">Belgium</option>
		<option value="Bosnian" label="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
		<option value="Bulgarian" label="Bulgaria">Bulgaria</option>
		<option value="Croatian" label="Croatia">Croatia</option>
		<option value="Cypriot" label="Cyprus">Cyprus</option>
		<option value="Czech" label="Czech Republic">Czech Republic</option>
		<option value="Danish" label="Denmark">Denmark</option>
		<option value="East German" label="East Germany">East Germany</option>
		<option value="Estonian" label="Estonia">Estonia</option>
		<option value="Faroese" label="Faroe Islands">Faroe Islands</option>
		<option value="Finnish" label="Finland">Finland</option>
		<option value="French" label="France">France</option>
		<option value="German" label="Germany">Germany</option>
		<option value="Gibraltarian" label="Gibraltar">Gibraltar</option>
		<option value="Greek" label="Greece">Greece</option>
		<option value="Guernseyman" label="Guernsey">Guernsey</option>
		<option value="Hungarian" label="Hungary">Hungary</option>
		<option value="Icelander" label="Iceland">Iceland</option>
		<option value="Irish" label="Ireland">Ireland</option>
		<option value="Manx" label="Isle of Man">Isle of Man</option>
		<option value="Italian" label="Italy">Italy</option>
		<option value="Jerseyman" label="Jersey">Jersey</option>
		<option value="Latvian" label="Latvia">Latvia</option>
		<option value="Liechtensteiner" label="Liechtenstein">Liechtenstein</option>
		<option value="Lithuanian" label="Lithuania">Lithuania</option>
		<option value="Luxembourger" label="Luxembourg">Luxembourg</option>
		<option value="Macedonian" label="Macedonia">Macedonia</option>
		<option value="Maltese" label="Malta">Malta</option>
		<option value="Metropolitan French" label="Metropolitan France">Metropolitan France</option>
		<option value="Moldovan" label="Moldova">Moldova</option>
		<option value="Monacan" label="Monaco">Monaco</option>
		<option value="Montenegrin" label="Montenegro">Montenegro</option>
		<option value="Dutch" label="Netherlands">Netherlands</option>
		<option value="Norwegian" label="Norway">Norway</option>
		<option value="Polish" label="Poland">Poland</option>
		<option value="Portuguese" label="Portugal">Portugal</option>
		<option value="Romanian" label="Romania">Romania</option>
		<option value="Russian" label="Russia">Russia</option>
		<option value="Sammarinese" label="San Marino">San Marino</option>
		<option value="Serbian" label="Serbia">Serbia</option>
		<option value="Serbo-Montenegrin" label="Serbia and Montenegro">Serbia and Montenegro</option>
		<option value="Slovak" label="Slovakia">Slovakia</option>
		<option value="Slovene" label="Slovenia">Slovenia</option>
		<option value="Spanish" label="Spain">Spain</option>
		<option value="Svalbardian" label="Svalbard and Jan Mayen">Svalbard and Jan Mayen</option>
		<option value="Swedish" label="Sweden">Sweden</option>
		<option value="Swiss" label="Switzerland">Switzerland</option>
		<option value="Ukrainian" label="Ukraine">Ukraine</option>
		<option value="Soviet" label="Union of Soviet Socialist Republics"
			>Union of Soviet Socialist Republics</option
		>
		<option value="British" label="United Kingdom">United Kingdom</option>
		<option value="Vatican" label="Vatican City">Vatican City</option>
		<option value="Ålandic" label="Åland Islands">Åland Islands</option>
	</optgroup>
	<optgroup id="country-optgroup-Oceania" label="Oceania">
		<option value="American Samoan" label="American Samoa">American Samoa</option>
		<option value="Antarctic" label="Antarctica">Antarctica</option>
		<option value="Australian" label="Australia">Australia</option>
		<option value="Bouvet Islander" label="Bouvet Island">Bouvet Island</option>
		<option value="British Indian Ocean Territory" label="British Indian Ocean Territory"
			>British Indian Ocean Territory</option
		>
		<option value="Christmas Islander" label="Christmas Island">Christmas Island</option>
		<option value="Cocos Islander" label="Cocos [Keeling] Islands">Cocos [Keeling] Islands</option>
		<option value="Cook Islander" label="Cook Islands">Cook Islands</option>
		<option value="Fijian" label="Fiji">Fiji</option>
		<option value="French Polynesian" label="French Polynesia">French Polynesia</option>
		<option value="French Southern Territories" label="French Southern Territories"
			>French Southern Territories</option
		>
		<option value="Guamanian" label="Guam">Guam</option>
		<option value="Heard Islander" label="Heard Island and McDonald Islands"
			>Heard Island and McDonald Islands</option
		>
		<option value="I-Kiribati" label="Kiribati">Kiribati</option>
		<option value="Marshallese" label="Marshall Islands">Marshall Islands</option>
		<option value="Micronesian" label="Micronesia">Micronesia</option>
		<option value="Nauruan" label="Nauru">Nauru</option>
		<option value="New Caledonian" label="New Caledonia">New Caledonia</option>
		<option value="New Zealander" label="New Zealand">New Zealand</option>
		<option value="Niuean" label="Niue">Niue</option>
		<option value="Norfolk Islander" label="Norfolk Island">Norfolk Island</option>
		<option value="Northern Mariana Islander" label="Northern Mariana Islands"
			>Northern Mariana Islands</option
		>
		<option value="Palauan" label="Palau">Palau</option>
		<option value="Papua New Guinean" label="Papua New Guinea">Papua New Guinea</option>
		<option value="Pitcairn Islander" label="Pitcairn Islands">Pitcairn Islands</option>
		<option value="Samoan" label="Samoa">Samoa</option>
		<option value="Solomon Islander" label="Solomon Islands">Solomon Islands</option>
		<option value="South Georgian" label="South Georgia and the South Sandwich Islands"
			>South Georgia and the South Sandwich Islands</option
		>
		<option value="Tokelauan" label="Tokelau">Tokelau</option>
		<option value="Tongan" label="Tonga">Tonga</option>
		<option value="Tuvaluan" label="Tuvalu">Tuvalu</option>
		<option value="U.S. Minor Outlying Islander" label="U.S. Minor Outlying Islands"
			>U.S. Minor Outlying Islands</option
		>
		<option value="Ni-Vanuatu" label="Vanuatu">Vanuatu</option>
		<option value="Wallisian" label="Wallis and Futuna">Wallis and Futuna</option>
	</optgroup>
</select>
