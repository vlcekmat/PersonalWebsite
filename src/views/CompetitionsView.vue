<script setup lang="ts">
import { ref, reactive } from 'vue';

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
    console.error("API Error:", error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="souteze-wrapper">
    <h2>DanceSport Calendar</h2>
    <p class="typing">DATABASE_ACCESS: Filter active competitions...</p>

    <div class="responsive-layout">
      <aside class="sidebar">
        <form class="cyber-form" @submit.prevent="fetchSouteze">
          <h5>SEARCH_FILTERS</h5>

          <div class="input-group">
            <label for="vek">AGE_GROUP</label>
            <select id="vek" v-model="filters.vek">
              <option v-for="v in moznostiVek" :key="v" :value="v">{{ v }}</option>
            </select>
          </div>

          <div class="input-group">
            <label for="trida">CLASS</label>
            <select id="trida" v-model="filters.trida">
              <option v-for="t in moznostiTrida" :key="t" :value="t">{{ t }}</option>
            </select>
          </div>

          <div class="input-group">
            <label for="disciplina">DISCIPLINE</label>
            <select id="disciplina" v-model="filters.disciplina">
              <option v-for="d in moznostiDisciplina" :key="d" :value="d">{{ d }}</option>
            </select>
          </div>

          <button type="submit" :disabled="loading" class="glow-button">
            {{ loading ? 'FETCHING...' : 'RUN_QUERY' }}
          </button>
        </form>
      </aside>

      <main class="results-area">
        <div class="status-bar" v-if="hasSearched">
          <span>RESULTS_FOUND: {{ souteze.length }}</span>
          <span class="glitch-line"></span>
        </div>

        <div v-if="loading" class="loading-status">SCANNING_DATA_NODES...</div>

        <div v-else-if="souteze.length > 0" class="cards-grid">
          <div v-for="soutez in souteze" :key="soutez.url" class="cyber-card">
            <div class="card-header">
              <span class="date-badge">{{ soutez.datum }}</span>
              <a :href="soutez.url" target="_blank" class="url-link">LINK_STREAMS</a>
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
          [!] ERR: NO_MATCHES_IN_SYSTEM
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.souteze-wrapper {
  width: 100%;
  margin-top: 1em;
}

/* RESPONZIVNÍ LAYOUT */
.responsive-layout {
  display: flex;
  flex-direction: row;
  gap: 3em;
  margin-top: 2em;
}

/* Sidebar na desktopu fixní šířka */
.sidebar {
  flex: 0 0 300px;
}

.results-area {
  flex: 1;
  min-width: 0; /* Důležité pro flexbox a dlouhé texty */
}

/* FORMULÁŘ */
.cyber-form {
  background: var(--darkGrey);
  padding: 1.5em;
  border-left: 4px solid var(--accent);
  box-shadow: 5px 5px 0px var(--black);
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 1.2em;
}

.cyber-form label {
  color: var(--light);
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 0.4em;
  letter-spacing: 1px;
}

select {
  background-color: var(--black);
  color: var(--white);
  border: 1px solid var(--dark);
  padding: 0.7em;
  font-family: inherit;
  font-weight: bold;
  outline: none;
  width: 100%;
}

select:focus {
  border-color: var(--accent);
}

.glow-button {
  width: 100%;
  background-color: var(--dark);
  color: var(--light);
  border: 1px solid var(--accent);
  padding: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
}

.glow-button:hover:not(:disabled) {
  background-color: var(--accent);
  color: var(--black);
  box-shadow: 0 0 15px var(--glow-color);
}

/* KARTY */
.status-bar {
  margin-bottom: 1.5em;
  font-size: 0.8rem;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 1em;
}

.glitch-line {
  flex: 1;
  height: 1px;
  background: var(--dark);
}

.cyber-card {
  background-color: var(--black);
  border: 1px solid var(--darkGrey);
  padding: 1.2em;
  margin-bottom: 2em;
  border-radius: 0;
  transition: border-color 0.3s ease;
}

.cyber-card:hover {
  border-color: var(--accent);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
}

.date-badge {
  color: var(--accent);
  font-weight: bold;
  background: var(--darkGrey);
  padding: 0.2em 0.6em;
}

.url-link {
  font-size: 0.7rem;
  text-decoration: underline;
  opacity: 0.6;
}

.address {
  font-size: 0.9rem;
  margin-bottom: 1.2em;
  line-height: 1.4;
}

.kat-tag {
  display: flex;
  flex-wrap: wrap; /* Pro velmi malé telefony */
  align-items: center;
  background: var(--darkGrey);
  padding: 0.6em;
  margin-bottom: 0.5em;
  border-right: 3px solid var(--accent);
  gap: 0.8em;
}

.disc {
  color: var(--accent);
  font-weight: bold;
}

.time {
  margin-left: auto;
  font-size: 0.85rem;
  color: var(--light);
}

/* --- MEDIA QUERIES PRO RESPONZIVITU --- */

/* Tablety a menší desktop */
@media (max-width: 1100px) {
  .responsive-layout {
    gap: 1.5em;
  }
  .sidebar {
    flex: 0 0 250px;
  }
}

/* Mobily a menší tablety (Přepnutí na vertikální zobrazení) */
@media (max-width: 850px) {
  .responsive-layout {
    flex-direction: column;
  }

  .sidebar {
    flex: none;
    width: 100%;
  }

  .results-area {
    width: 100%;
  }

  h2 {
    font-size: 1.5rem;
  }

  /* Zvětšení klikacích ploch pro mobily */
  select, .glow-button {
    padding: 1.2em;
  }

  .kat-tag {
    font-size: 0.8rem;
  }
}

/* Velmi malé telefony */
@media (max-width: 450px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
  }

  .url-link {
    align-self: flex-end;
  }

  .kat-tag {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.2em;
  }

  .time {
    margin-left: 0;
    border-top: 1px solid var(--dark);
    width: 100%;
    padding-top: 0.2em;
  }
}
</style>
