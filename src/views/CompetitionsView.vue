<script setup lang="ts">
import { ref, reactive } from 'vue';

// Definice možností pro dropdowny (podle dat ČSTS)
const moznostiVek = ["Dospělí", "Mládež", "Junioři-2", "Junioři-1", "Děti-2", "Děti-1", "Senioři-1", "Senioři-2", "Senioři-3"];
const moznostiTrida = ["E", "D", "C", "B", "A", "M"];
const moznostiDisciplina = ["STT", "LAT", "KOMB"];

interface Kategorie {
  vek: string;
  trida: string;
  disciplina: string;
  prezence: string;
}

interface Soutez {
  datum: string;
  adresa: string;
  url: string;
  nalezene_kategorie: Kategorie[];
}

const souteze = ref<Soutez[]>([]);
const loading = ref(false);
const hasSearched = ref(false);

const filters = reactive({
  vek: 'Dospělí',
  trida: 'E',
  disciplina: 'STT'
});

const fetchSouteze = async () => {
  loading.value = true;
  hasSearched.value = true;

  const params = new URLSearchParams(filters);

  try {
    const response = await fetch(`https://soutezeserver.onrender.com/api/souteze?${params.toString()}`);
    const result = await response.json();

    if (result.status === 'success') {
      souteze.value = result.data;
    }
  } catch (error) {
    console.error("Chyba při komunikaci s API:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="souteze-wrapper">
    <h2>DanceSport Calendar</h2>
    <p class="typing">Filtruj soutěže přímo z databáze ČSTS...</p>

    <div class="my-flex">
      <div class="filter-section">
        <form class="cyber-form" @submit.prevent="fetchSouteze">
          <h5>Vyhledávání</h5>

          <label for="vek">Věková kategorie</label>
          <select id="vek" v-model="filters.vek">
            <option v-for="v in moznostiVek" :key="v" :value="v">{{ v }}</option>
          </select>

          <label for="trida">Výkonnostní třída</label>
          <select id="trida" v-model="filters.trida">
            <option v-for="t in moznostiTrida" :key="t" :value="t">{{ t }}</option>
          </select>

          <label for="disciplina">Disciplína</label>
          <select id="disciplina" v-model="filters.disciplina">
            <option v-for="d in moznostiDisciplina" :key="d" :value="d">{{ d }}</option>
          </select>

          <button type="submit" :disabled="loading" class="glow-button">
            {{ loading ? 'SYSTEM_BUSY...' : 'EXECUTE_SEARCH' }}
          </button>
        </form>
      </div>

      <div class="messages-container">
        <h5 v-if="hasSearched">Nalezené eventy [{{ souteze.length }}]</h5>

        <div v-if="loading" class="loading-status">INITIALIZING_SCRAPER...</div>

        <div v-else-if="souteze.length > 0" class="cards-grid">
          <div v-for="soutez in souteze" :key="soutez.url" class="cyber-card">
            <div class="card-header">
              <span class="date-badge">{{ soutez.datum }}</span>
              <a :href="soutez.url" target="_blank" class="url-link">EXTERNAL_LINK</a>
            </div>

            <p class="address">{{ soutez.adresa.split('|')[0] }}</p>

            <div class="category-list">
              <div v-for="(kat, idx) in soutez.nalezene_kategorie" :key="idx" class="kat-tag">
                <span class="disc">{{ kat.disciplina }}</span>
                <span class="details">{{ kat.vek }} "{{ kat.trida }}"</span>
                <span class="time">{{ kat.prezence }}</span>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="hasSearched" class="no-results">
          NO_DATA_FOUND: Zkus změnit parametry filtru.
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.souteze-wrapper {
  color: var(--white);
}

/* Flex layout podle tvého main.css */
.my-flex {
  display: flex;
  justify-content: left;
  gap: 4em; /* Sníženo z 10em pro lepší zobrazení na menších obrazovkách */
  margin-top: 2em;
}

/* Styl formuláře a dropdownů */
.cyber-form {
  display: flex;
  flex-direction: column;
  min-width: 250px;
  background: var(--darkGrey);
  padding: 1.5em;
  border-left: 3px solid var(--accent);
}

.cyber-form label {
  color: var(--light);
  font-size: 0.8rem;
  text-transform: uppercase;
  margin-top: 1.2em;
  margin-bottom: 0.4em;
}

select {
  background-color: var(--black);
  color: var(--accent);
  border: 1px solid var(--dark);
  padding: 0.6em;
  font-family: inherit;
  font-weight: bold;
  cursor: pointer;
  outline: none;
}

select:focus {
  border-color: var(--accent);
  box-shadow: 0 0 5px var(--glow-color);
}

/* Neonové tlačítko */
.glow-button {
  background-color: var(--dark);
  color: var(--light);
  border: 1px solid var(--accent);
  margin-top: 2em;
  padding: 0.8em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.glow-button:hover:not(:disabled) {
  background-color: var(--accent);
  color: var(--black);
  box-shadow: 0 0 20px var(--glow-color);
}

.glow-button:disabled {
  opacity: 0.5;
  cursor: wait;
}

/* Karty soutěží */
.cyber-card {
  background-color: var(--black);
  border: 1px solid var(--darkGrey);
  padding: 1.2em;
  margin-bottom: 1.5em;
  position: relative;
  transition: transform 0.2s ease;
}

.cyber-card:hover {
  border-color: var(--accent);
  box-shadow: -5px 5px 0px var(--dark);
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--darkGrey);
  padding-bottom: 0.5em;
  margin-bottom: 0.8em;
}

.date-badge {
  color: var(--accent);
  font-weight: bold;
  letter-spacing: 1px;
}

.url-link {
  font-size: 0.7rem;
  text-decoration: underline;
  opacity: 0.7;
}

.address {
  font-size: 0.85rem;
  color: var(--white);
  opacity: 0.9;
  margin-bottom: 1em;
}

/* Tagy pro kategorie */
.kat-tag {
  display: flex;
  align-items: center;
  background: var(--darkGrey);
  padding: 0.4em 0.8em;
  border-radius: 2px;
  font-size: 0.9rem;
  gap: 1em;
  border-right: 2px solid var(--accent);
}

.disc {
  color: var(--accent);
  font-weight: bold;
  min-width: 40px;
}

.time {
  margin-left: auto;
  color: var(--light);
  font-family: monospace;
}

.loading-status {
  color: var(--accent);
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { opacity: 1; }
  50% { opacity: 0.4; }
  100% { opacity: 1; }
}

/* Responzivita */
@media (max-width: 1000px) {
  .my-flex {
    flex-direction: column;
    gap: 2em;
  }
  .messages-container {
    width: 100%;
  }
}
</style>
