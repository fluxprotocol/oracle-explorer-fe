# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.1.2](https://github.com/fluxprotocol/oracle-explorer-fe/compare/v0.1.1...v0.1.2) (2021-11-25)


### Features

* **account:** Add support for analytics ([16ee6d9](https://github.com/fluxprotocol/oracle-explorer-fe/commit/16ee6d92142dbaea7e4483d80579f3c09c9f7e66))
* **config:** Add testnet and mainnet configs ([b628008](https://github.com/fluxprotocol/oracle-explorer-fe/commit/b628008d225057851a23391832201099729f64eb))
* **page:** Add announcement messages ([3466c7e](https://github.com/fluxprotocol/oracle-explorer-fe/commit/3466c7e86d3b6b40e70d3d04a9c7d3d7b4fee269))
* **requestDetail:** Disable staking and finalizing when final arbitrator has been triggered ([a50a17a](https://github.com/fluxprotocol/oracle-explorer-fe/commit/a50a17ae31e84bc7989ea60d68c0dc6e4e72e52d))
* **stakes:** Show no entries message when there are no entries ([0a42179](https://github.com/fluxprotocol/oracle-explorer-fe/commit/0a42179886978a0d018f5deeebf44e0eb1aabbed))


### Bug Fixes

* **account:** Fix issue where requestor could not be found ([7677b17](https://github.com/fluxprotocol/oracle-explorer-fe/commit/7677b17a1f279b8a646a1e9229dc069389b151ba))
* **build:** Fix issue where CNAME was not included ([1b83130](https://github.com/fluxprotocol/oracle-explorer-fe/commit/1b83130aa5e5a5bd3a14e684078a89e5a31a0116))
* **reward:** Fix issue where reward was always 0 ([5070878](https://github.com/fluxprotocol/oracle-explorer-fe/commit/507087889a027a57a55f566ed0cd1bbb0520dd16))

### 0.1.1 (2021-09-21)


### Features

* **account:** Hide/show requests when there is at least one request ([347f6e7](https://github.com/fluxprotocol/oracle-explorer-fe/commit/347f6e7ea290327089d5576c3490c28090e6a635))
* Remove target_contract and contract_entry ([8cdbf56](https://github.com/fluxprotocol/oracle-explorer-fe/commit/8cdbf56ac425fd69b9507e276dee176e0288922e))
* **account:** Remove requests tab when the account is not in the whitelist ([b5e75f3](https://github.com/fluxprotocol/oracle-explorer-fe/commit/b5e75f37e5b27ca06d230f38eb613796f83ee9cc))
* **config:** Pretty format the flux market cap ([a86d691](https://github.com/fluxprotocol/oracle-explorer-fe/commit/a86d691d890e3aa4aca0fa0018992bc1486e256e))
* **icons:** Changed icons to the new flux logo ([774b751](https://github.com/fluxprotocol/oracle-explorer-fe/commit/774b7517ae88eb00db3f5b253b87599cd1f137f5))
* Add account page ([98877d1](https://github.com/fluxprotocol/oracle-explorer-fe/commit/98877d10218392f5dfc0557bd1a6ba1a967c217c))
* Add closing timer for a resolution window ([827da04](https://github.com/fluxprotocol/oracle-explorer-fe/commit/827da042228c12ab69afeceab8db1c5bf98efec1))
* Add config viewing to the explorer page ([f3e1d98](https://github.com/fluxprotocol/oracle-explorer-fe/commit/f3e1d98bbc8e7b049a560305c9903ada6a492913))
* Add extra info on settlement time and validity bond ([f8119ee](https://github.com/fluxprotocol/oracle-explorer-fe/commit/f8119ee4fd3a98413318b8b7cc5301d592916d3e))
* Add option for fetching the current token price ([564def8](https://github.com/fluxprotocol/oracle-explorer-fe/commit/564def845a6f2326bc69d3b160f40b2a84b50d4f))
* Add PWA icons and manifest ([5bdd4ac](https://github.com/fluxprotocol/oracle-explorer-fe/commit/5bdd4acc862322c80ff15b17a152529558247d7a))
* Add some stats for the home page ([6cee49d](https://github.com/fluxprotocol/oracle-explorer-fe/commit/6cee49dfd6af668bec164a0d29c9a1ec7ac3f036))
* Add support for account searching ([b1f6d62](https://github.com/fluxprotocol/oracle-explorer-fe/commit/b1f6d620bc20d0ce9fcede8b1d4ae1efc8fd83d7))
* Add support for description and settlement time ([1a8bcfe](https://github.com/fluxprotocol/oracle-explorer-fe/commit/1a8bcfea2d3bdafd7813a07fcb589c7e2fd0e6e8))
* Add support for filtering for non api requests ([25818e3](https://github.com/fluxprotocol/oracle-explorer-fe/commit/25818e3d1bfd4b1805ea24160cdb0f65b33ba6d7))
* Add support for real data requests ([cc5faf4](https://github.com/fluxprotocol/oracle-explorer-fe/commit/cc5faf4b626218897d87eb9fdec2faa9616c96a3))
* Add support for submitting numbers using u128 ([0f95671](https://github.com/fluxprotocol/oracle-explorer-fe/commit/0f95671c16aee4d2cd49b7eaca2281cb60c55972))
* Add support for tags ([aca757f](https://github.com/fluxprotocol/oracle-explorer-fe/commit/aca757f99fbdba5c5de494813e17e2fd305dd207))
* Added support for data_type and adjusting the stake UI accordingly ([90cff88](https://github.com/fluxprotocol/oracle-explorer-fe/commit/90cff88165e5e03a796337e594443a02b94ab471))
* Changed logo ([96c20f9](https://github.com/fluxprotocol/oracle-explorer-fe/commit/96c20f98aa1a2291f8f8820aa7032eb6dcc2675f))
* **unstake:** Allow unstaking to be always done on any round as long as there is unbonded stake ([67c2e80](https://github.com/fluxprotocol/oracle-explorer-fe/commit/67c2e80a072d5426755597d2198c7da8066c7a4d))
* Add support for better view of what is claimed and what is lost ([4cc1a5e](https://github.com/fluxprotocol/oracle-explorer-fe/commit/4cc1a5e4007fac6f1eb3d8b241109ad4e6339d0e))
* Add support for viewing storage and withdrawing storage ([f504f01](https://github.com/fluxprotocol/oracle-explorer-fe/commit/f504f010dacb2aee71a583f5d04e7e60ccc139ea))
* Add UI for seeing correct/incorrect amount staked ([dac9149](https://github.com/fluxprotocol/oracle-explorer-fe/commit/dac914985b7efaa8c2b4f6cf16acbd07eeea5532))
* Add unclaimed page ([a9b3881](https://github.com/fluxprotocol/oracle-explorer-fe/commit/a9b3881c08fd9b7f349e5744ef885504230786aa))
* Add unstaking support ([ae04b19](https://github.com/fluxprotocol/oracle-explorer-fe/commit/ae04b198883023107d0ce129c850c37a6719d136))
* Add user staking and claiming of fees ([82cd679](https://github.com/fluxprotocol/oracle-explorer-fe/commit/82cd679cf98bcc71088f578be405ed63287811a2))
* Implemented search ([0ef4c4a](https://github.com/fluxprotocol/oracle-explorer-fe/commit/0ef4c4abc418d212c280514ab59dbc416f036826))
* Made explorer mobile compatible ([e36506b](https://github.com/fluxprotocol/oracle-explorer-fe/commit/e36506bbf5d0f1cd264508fd74b6758f83fc0e96))
* Made footer sticky ([1598371](https://github.com/fluxprotocol/oracle-explorer-fe/commit/1598371d23d42fa7a920935378e41f3145e1f47c))
* Made token symbol configurable ([2e80d1c](https://github.com/fluxprotocol/oracle-explorer-fe/commit/2e80d1c4ef35f643773e68609176084d4f0ef730))
* Unstake any unbonded stake on claim ([fbc14b4](https://github.com/fluxprotocol/oracle-explorer-fe/commit/fbc14b404c0d2ebcf511e4eee46455ffd9b7925e))
* Use ft_metadata to determine decimals/name of token ([8331945](https://github.com/fluxprotocol/oracle-explorer-fe/commit/8331945a2699e7cec397e2ce1121496f619890f8))
* **account:** Add whitelist card ([1619308](https://github.com/fluxprotocol/oracle-explorer-fe/commit/161930820a9cf0c89c873758e26844a0288fa127))


### Bug Fixes

* **request:** Fix issue where wrong property was used for target contract ([9155ae0](https://github.com/fluxprotocol/oracle-explorer-fe/commit/9155ae0ee759bc48ff40564c0cd87a20f0d6d778))
* **request:** Replace requestor with requestor_account_id ([9f3ace6](https://github.com/fluxprotocol/oracle-explorer-fe/commit/9f3ace67a24d389ae478584ecb291f88c6057286))
* **resolutionWindow:** Fix issue where timer was still showing even though the window was bonded ([b2c084b](https://github.com/fluxprotocol/oracle-explorer-fe/commit/b2c084b8f00a6b252c45d1ac8f9a944756350fef))
* **stakerReport:** Fix issue where having two different staked outcomes on one account would only show one outcome ([4aa5c4f](https://github.com/fluxprotocol/oracle-explorer-fe/commit/4aa5c4f5fdc7ec9eb31e202e729073e61bd34537))
* Fix issue where upgrading stake token would not be reflected in UI ([6df0ec0](https://github.com/fluxprotocol/oracle-explorer-fe/commit/6df0ec00e2b0315219ea37c6ffab5a6d685ded1d))
* **unclaimed:** Fix issue where same answers where getting merged even though the data request id was different ([2d4a8b6](https://github.com/fluxprotocol/oracle-explorer-fe/commit/2d4a8b680a72eecaf7e3ee15b59fec9de445f307))
* Fix issue where account page could crash due non existing account ([5534c93](https://github.com/fluxprotocol/oracle-explorer-fe/commit/5534c932d16c86ec415345b2c5d1216f583a1154))
* Fix issue with calldatainfo where no data would cause the page to look weird ([188c62c](https://github.com/fluxprotocol/oracle-explorer-fe/commit/188c62c9ca022aa841702082e62d957cd16e7082))
