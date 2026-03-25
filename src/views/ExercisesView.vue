<script setup lang="ts">
import {computed, ref} from "vue";
import type {Exercise} from "@/model/Exercise.ts";

const API_URL = "https://www.exercisedb.dev/api/v1"

const muscleGroups = [
  { name: "shins" }, { name: "hands" }, { name: "sternocleidomastoid" },
  { name: "soleus" }, { name: "inner thighs" }, { name: "lower abs" },
  { name: "grip muscles" }, { name: "abdominals" }, { name: "wrist extensors" },
  { name: "wrist flexors" }, { name: "latissimus dorsi" }, { name: "upper chest" },
  { name: "rotator cuff" }, { name: "wrists" }, { name: "groin" },
  { name: "brachialis" }, { name: "deltoids" }, { name: "feet" },
  { name: "ankles" }, { name: "trapezius" }, { name: "rear deltoids" },
  { name: "chest" }, { name: "quadriceps" }, { name: "back" },
  { name: "core" }, { name: "shoulders" }, { name: "ankle stabilizers" },
  { name: "rhomboids" }, { name: "obliques" }, { name: "lower back" },
  { name: "hip flexors" }, { name: "levator scapulae" }, { name: "abductors" },
  { name: "serratus anterior" }, { name: "traps" }, { name: "forearms" },
  { name: "delts" }, { name: "biceps" }, { name: "upper back" },
  { name: "spine" }, { name: "cardiovascular system" }, { name: "triceps" },
  { name: "adductors" }, { name: "hamstrings" }, { name: "glutes" },
  { name: "pectorals" }, { name: "calves" }, { name: "lats" },
  { name: "quads" }, { name: "abs" }
];

const bodyParts = [
  { name: "back" },
  { name: "cardio" },
  { name: "chest" },
  { name: "lower arms" },
  { name: "lower legs" },
  { name: "neck" },
  { name: "shoulders" },
  { name: "upper arms" },
  { name: "upper legs" },
  { name: "waist" }
];

const equipment = [
  { name: "assisted" },
  { name: "band" },
  { name: "barbell" },
  { name: "body weight" },
  { name: "bosu ball" },
  { name: "cable" },
  { name: "dumbbell" },
  { name: "elliptical machine" },
  { name: "ez barbell" },
  { name: "hammer" },
  { name: "kettlebell" },
  { name: "leverage machine" },
  { name: "medicine ball" },
  { name: "olympic barbell" },
  { name: "resistance band" },
  { name: "roller" },
  { name: "rope" },
  { name: "skierg machine" },
  { name: "sled machine" },
  { name: "smith machine" },
  { name: "stability ball" },
  { name: "stationary bike" },
  { name: "stepmill machine" },
  { name: "tire" },
  { name: "trap bar" },
  { name: "upper body ergometer" },
  { name: "weighted" },
  { name: "wheel roller" }
];

const sortedMuscles = computed(() => {
  return [...muscleGroups].sort((a, b) => a.name.localeCompare(b.name))
})

const sortedBodyParts = computed(() => {
  return [...bodyParts].sort((a, b) => a.name.localeCompare(b.name))
})

const sortedEquipment = computed(() => {
  return [...equipment].sort((a, b) => a.name.localeCompare(b.name))
})

const fuzzySearchText = ref("");

const selectedMuscles = ref([])
const clearAllMuscles = () => {
  selectedMuscles.value = []
}

const selectedBodyParts = ref([])
const clearAllBodyParts = () => {
  selectedBodyParts.value = []
}

const selectedEquipment = ref([])
const clearAllEquipment = () => {
  selectedEquipment.value = []
}

const handleImageError = (failedExerciseId: string) => {
  exercises.value = exercises.value.filter(ex => ex.exerciseId !== failedExerciseId);
  console.warn(`Gif for exercise ${failedExerciseId} wasn't found (404). Exercise was hidden.`);
};

const loading = ref(false);
const hasSearched = ref(false);
const exercises = ref<Exercise[]>([]);

const currentPage = ref(1);
const totalPages = ref(1);
const limit = 10;

const fetchExercises = async (pageNumber = 1) => {
  loading.value = true;
  hasSearched.value = true;
  exercises.value = [];

  try {
    const params = new URLSearchParams();

    if (fuzzySearchText.value) {
      params.append("search", fuzzySearchText.value);
    }
    if (selectedMuscles.value.length) {
      params.append("muscles", selectedMuscles.value.join(","));
    }
    if (selectedBodyParts.value.length) {
      params.append("bodyParts", selectedBodyParts.value.join(","));
    }
    if (selectedEquipment.value.length) {
      params.append("equipment", selectedEquipment.value.join(","));
    }

    params.append("sortBy", "name");
    params.append("sortOrder", "desc");

    const offset = (pageNumber - 1) * limit;
    params.append("limit", limit.toString());
    params.append("offset", offset.toString());

    const query = params.toString();
    const endpoint = query ? `${API_URL}/exercises/filter?${query}` : `${API_URL}/exercises/filter`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch exercises");
    }

    const data = await response.json();

    exercises.value = data.data;
    currentPage.value = data.metadata.currentPage || pageNumber;
    totalPages.value = data.metadata.totalPages;

  } catch (error) {
    console.error("Error fetching exercises:", error);
    alert("SYSTEM_ERROR: Failed to fetch exercises.");
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    fetchExercises(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    fetchExercises(currentPage.value - 1);
  }
};
</script>

<template>
  <h2>Exercises</h2>
  <p class="typing">Access to the exercise database: GRANTED</p>
  <div class="responsive-layout">
    <aside class="sidebar">
      <form class="cyber-form" @submit.prevent="fetchExercises(1)">

        <h5>
          SEARCH_QUERY
        </h5>
        <div class="input-group">
          <label for="fuzzySearch">CONTAINS</label>
          <input id="fuzzySearch" v-model="fuzzySearchText" type="text" placeholder="FUZZY QUERY" />
        </div>

        <div class="input-group">
          <label for="muscle-select">MUSCLE_SELECT (CTRL + CLICK for multiple)</label>
          <select
              id="muscle-select"
              v-model="selectedMuscles"
              multiple
          >
            <option v-for="muscle in sortedMuscles" :key="muscle.name" :value="muscle.name">
              {{ muscle.name.charAt(0).toUpperCase() + muscle.name.slice(1) }}
            </option>
          </select>
          <button
              v-if="selectedMuscles.length > 0"
              @click="clearAllMuscles"
              class="clear-btn"
          >
            CLEAR({{ selectedMuscles.length }})
          </button>
        </div>

        <div class="input-group">
          <label for="bodypart-select">BODYPART_SELECT (CTRL + CLICK for multiple)</label>
          <select
              id="bodypart-select"
              v-model="selectedBodyParts"
              multiple
          >
            <option v-for="bodyPart in sortedBodyParts" :key="bodyPart.name" :value="bodyPart.name">
              {{ bodyPart.name.charAt(0).toUpperCase() + bodyPart.name.slice(1) }}
            </option>
          </select>
          <button
              v-if="selectedBodyParts.length > 0"
              @click="clearAllBodyParts"
              class="clear-btn"
          >
            CLEAR({{ selectedBodyParts.length }})
          </button>
        </div>

        <div class="input-group">
          <label for="equipment-select">EQUIPMENT_SELECT (CTRL + CLICK for multiple)</label>
          <select
              id="equipment-select"
              v-model="selectedEquipment"
              multiple
          >
            <option v-for="equipment in sortedEquipment" :key="equipment.name" :value="equipment.name">
              {{ equipment.name.charAt(0).toUpperCase() + equipment.name.slice(1) }}
            </option>
          </select>
          <button
              v-if="selectedEquipment.length > 0"
              @click="clearAllEquipment"
              class="clear-btn"
          >
            CLEAR({{ selectedEquipment.length }})
          </button>
        </div>

        <button type="submit" :disabled="loading" class="glow-button">
          {{ loading ? 'FETCHING...' : 'RUN_QUERY' }}
        </button>



      </form>
    </aside>

    <main class="results-area">
      <div v-if="loading" class="system-message">
        <p>INITIALIZING DATA TRANSFER...</p>
      </div>

      <div v-else-if="hasSearched && exercises.length === 0" class="system-message">
        <p>NO_RESULTS_FOUND. ADJUST PARAMETERS.</p>
      </div>

      <div v-else-if="exercises.length > 0" class="exercise-grid">
        <div v-for="exercise in exercises" :key="exercise.exerciseId" class="exercise-card">
          <img v-if="exercise.gifUrl" :src="exercise.gifUrl" :alt="exercise.name" class="exercise-img" loading="lazy" @error="handleImageError(exercise.exerciseId)"/>

          <div class="card-content">
            <h4 class="exercise-title">{{ exercise.name.toUpperCase() }}</h4>

            <div class="tag-section">
              <!-- MUSCLES -->
              <div class="tag-group" v-if="exercise.targetMuscles && exercise.targetMuscles.length">
                <span class="group-label">MUSCLES:</span>
                <div class="tags">
                  <span v-for="(muscle, index) in exercise.targetMuscles" :key="'m-'+index" class="tag">
                    {{ muscle }}
                  </span>
                  <span v-for="(muscle, index) in exercise.secondaryMuscles" :key="'m-'+index" class="tag">{{ muscle }}</span>
                </div>
              </div>

              <!-- BODY PARTS -->
              <div class="tag-group" v-if="exercise.bodyParts && exercise.bodyParts.length">
                <span class="group-label">BODY_PARTS:</span>
                <div class="tags">
                  <span v-for="(part, index) in exercise.bodyParts" :key="'bp-'+index" class="tag">
                    {{ part }}
                  </span>
                </div>
              </div>

              <!-- EQUIPMENT -->
              <div class="tag-group" v-if="exercise.equipments && exercise.equipments.length">
                <span class="group-label">EQUIPMENT:</span>
                <div class="tags">
                  <span v-for="(eq, index) in exercise.equipments" :key="'eq-'+index" class="tag">
                    {{ eq }}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        <div class="pagination-controls" v-if="totalPages > 1">
          <button
              @click="prevPage"
              :disabled="currentPage === 1 || loading"
              class="page-btn"
          >
            &lt; PREV
          </button>

          <span class="page-info">
            PAGE {{ currentPage }} OF {{ totalPages }}
          </span>

          <button
              @click="nextPage"
              :disabled="currentPage === totalPages || loading"
              class="page-btn"
          >
            NEXT &gt;
          </button>
        </div>

      </div>
    </main>


  </div>
</template>

<style scoped>
input {
  background-color: var(--black);
  color: var(--white);
  border: 1px solid var(--dark);
  padding: 0.7em;
  font-family: inherit;
  font-weight: bold;
  outline: none;
  width: 100%;
}

.clear-btn {
  background-color: var(--accent);
  color: var(--black);
  border: none;
  padding: 0.5em;
  font-size: 0.8em;
  font-family: inherit;
  margin-top: 0.5em;
  cursor: pointer;
}


.responsive-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.sidebar {
  flex: 0 0 300px;
}

.results-area {
  flex: 1;
}

.system-message {
  border: 1px dashed var(--accent, #0f0);
  padding: 2rem;
  text-align: center;
  color: var(--accent, #0f0);
  font-family: monospace;
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
}

.exercise-card {
  background: var(--black, #111);
  border: 1px solid var(--dark, #333);
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.3s;
}

.exercise-card:hover {
  border-color: var(--accent, #0f0);
}

.exercise-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  background-color: #fff;
}

.card-content {
  padding: 1rem;
}

.exercise-title {
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  color: var(--white, #fff);
}

.card-content {
  padding: 1rem;
}

.exercise-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--white, #fff);
  border-bottom: 1px solid var(--dark, #333);
  padding-bottom: 0.5rem;
}

.tag-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem; /* Mezera mezi kategoriemi */
}

.tag-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem; /* Mezera mezi nadpisem a štítky */
}

.group-label {
  font-size: 0.65rem;
  color: #888; /* Tmavší šedá pro nerušivý popisek */
  letter-spacing: 1px;
  font-family: monospace;
}

.tags {
  display: flex;
  flex-wrap: wrap; /* Pokud je štítků hodně, zalamují se na další řádek */
  gap: 0.4rem;
}

.tag {
  font-size: 0.75rem;
  background: var(--dark, #333);
  color: var(--accent, #0f0);
  padding: 0.2rem 0.6rem;
  font-family: monospace;
  border-radius: 2px;
}

button[type="button"].clear-btn {
  width: 100%;
}

.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--dark, #333);
}

.page-btn {
  background-color: transparent;
  color: var(--accent, #0f0);
  border: 1px solid var(--accent, #0f0);
  padding: 0.5rem 1rem;
  font-family: monospace;
  cursor: pointer;
  transition: all 0.2s ease;
}

.page-btn:hover:not(:disabled) {
  background-color: var(--accent, #0f0);
  color: var(--black, #111);
}

.page-btn:disabled {
  color: #555;
  border-color: #555;
  cursor: not-allowed;
}

.page-info {
  font-family: monospace;
  color: var(--white, #fff);
  letter-spacing: 1px;
}

</style>