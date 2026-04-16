<script setup lang="ts">
import {computed, ref} from "vue";
import type {Exercise} from "@/model/Exercise.ts";

const API_URL = "https://oss.exercisedb.dev/api/v1"

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
  { name: "back" }, { name: "cardio" }, { name: "chest" },
  { name: "lower arms" }, { name: "lower legs" }, { name: "neck" },
  { name: "shoulders" }, { name: "upper arms" }, { name: "upper legs" },
  { name: "waist" }
];

const equipment = [
  { name: "assisted" }, { name: "band" }, { name: "barbell" },
  { name: "body weight" }, { name: "bosu ball" }, { name: "cable" },
  { name: "dumbbell" }, { name: "elliptical machine" }, { name: "ez barbell" },
  { name: "hammer" }, { name: "kettlebell" }, { name: "leverage machine" },
  { name: "medicine ball" }, { name: "olympic barbell" }, { name: "resistance band" },
  { name: "roller" }, { name: "rope" }, { name: "skierg machine" },
  { name: "sled machine" }, { name: "smith machine" }, { name: "stability ball" },
  { name: "stationary bike" }, { name: "stepmill machine" }, { name: "tire" },
  { name: "trap bar" }, { name: "upper body ergometer" }, { name: "weighted" },
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

const pageCursors = ref<string[]>(['']);

const fetchExercises = async (pageNumber = 1) => {
  loading.value = true;
  hasSearched.value = true;
  exercises.value = [];

  // If we are starting a fresh search, reset the cursor stack
  if (pageNumber === 1) {
    pageCursors.value = [''];
  }

  try {
    const params = new URLSearchParams();

    // UPDATED: 'search' -> 'name'
    if (fuzzySearchText.value) {
      params.append("name", fuzzySearchText.value);
    }
    // UPDATED: 'muscles' -> 'targetMuscles'
    if (selectedMuscles.value.length) {
      params.append("targetMuscles", selectedMuscles.value.join(","));
    }
    // 'bodyParts' remains correct
    if (selectedBodyParts.value.length) {
      params.append("bodyParts", selectedBodyParts.value.join(","));
    }
    // UPDATED: 'equipment' -> 'equipments'
    if (selectedEquipment.value.length) {
      params.append("equipments", selectedEquipment.value.join(","));
    }

    params.append("limit", limit.toString());

    // Pull the correct cursor from our history stack based on the requested page
    const currentCursor = pageCursors.value[pageNumber - 1];

    // UPDATED: 'cursor' -> 'after'
    if (currentCursor) {
      params.append("after", currentCursor);
    }

    const query = params.toString();
    const endpoint = query ? `${API_URL}/exercises?${query}` : `${API_URL}/exercises`;

    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error("Failed to fetch exercises");
    }

    const data = await response.json();

    exercises.value = data.data;
    currentPage.value = pageNumber;

    // Save the next cursor into our array so we can use it to fetch the next page
    if (data.meta?.nextCursor) {
      pageCursors.value[pageNumber] = data.meta.nextCursor;
    }

    const totalItems = data.meta?.total || 0;
    totalPages.value = Math.ceil(totalItems / limit) || 1;

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

const expandedExercises = ref(new Set<string>());

const toggleInstructions = (id: string) => {
  if (expandedExercises.value.has(id)) {
    expandedExercises.value.delete(id);
  } else {
    expandedExercises.value.add(id);
  }
};

const formatStep = (step: string) => step.replace(/^Step:\d+\s*/i, '');

const muscleSize = computed(() => Math.min(sortedMuscles.value.length, 20))
const bodyPartSize = computed(() => Math.min(sortedBodyParts.value.length, 20))
const equipmentSize = computed(() => Math.min(sortedEquipment.value.length, 20))
</script>

<template>
  <h2>Exercises</h2>
  <p class="typing">Access to the exercise database: GRANTED</p>
  <div class="responsive-layout" :class="{ 'no-results': exercises.length === 0 }">
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
              :size="muscleSize"
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
              :size="bodyPartSize"
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
              :size="equipmentSize"
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
              <div class="tag-group" v-if="exercise.targetMuscles && exercise.targetMuscles.length">
                <span class="group-label">MUSCLES:</span>
                <div class="tags">
                  <span v-for="(muscle, index) in exercise.targetMuscles" :key="'m-'+index" class="tag">
                    {{ muscle }}
                  </span>
                  <span v-for="(muscle, index) in exercise.secondaryMuscles" :key="'m-'+index" class="tag">{{ muscle }}</span>
                </div>
              </div>

              <div class="tag-group" v-if="exercise.bodyParts && exercise.bodyParts.length">
                <span class="group-label">BODY_PARTS:</span>
                <div class="tags">
                  <span v-for="(part, index) in exercise.bodyParts" :key="'bp-'+index" class="tag">
                    {{ part }}
                  </span>
                </div>
              </div>

              <div class="tag-group" v-if="exercise.equipments && exercise.equipments.length">
                <span class="group-label">EQUIPMENT:</span>
                <div class="tags">
                  <span v-for="(eq, index) in exercise.equipments" :key="'eq-'+index" class="tag">
                    {{ eq }}
                  </span>
                </div>
              </div>
            </div>

            <button
                @click="toggleInstructions(exercise.exerciseId)"
                class="page-btn toggle-btn"
                type="button"
            >
              {{ expandedExercises.has(exercise.exerciseId) ? '✕ CLOSE' : '+ VIEW INSTRUCTIONS' }}
            </button>


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

    <!-- Instructions Overlay Modal -->
    <div
      v-if="expandedExercises.size > 0"
      class="instructions-overlay"
      @click.self="expandedExercises.clear()"
    >
      <div class="instructions-modal">
        <div class="modal-header">
          <h3>EXERCISE INSTRUCTIONS</h3>
          <button
            @click="expandedExercises.clear()"
            class="close-btn"
            aria-label="Close instructions"
          >
            ✕
          </button>
        </div>
        <div class="modal-body">
          <div
            v-for="exercise in exercises.filter(e => expandedExercises.has(e.exerciseId))"
            :key="exercise.exerciseId"
            class="instruction-content"
          >
            <h4 class="instruction-title">{{ exercise.name.toUpperCase() }}</h4>
            <ol class="instructions-list">
              <li v-for="(step, index) in exercise.instructions" :key="'step-'+index">
                <span class="step-number">{{ index + 1 }})</span>
                {{ formatStep(step) }}
              </li>
            </ol>
            <div v-if="exercise.gifUrl" class="exercise-modal-img">
              <img :src="exercise.gifUrl" :alt="exercise.name" />
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<style scoped>
.system-message {
  border: 1px dashed var(--accent, #0f0);
  padding: 2rem;
  text-align: center;
  color: var(--accent, #0f0);
  font-family: monospace;
}

.exercise-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(15.625rem, 1fr));
  gap: 1.5rem;
}

.exercise-card {
  background: var(--black, #111);
  border: 1px solid var(--dark, #333);
  border-radius: 0.25rem;
  overflow: hidden;
  transition: border-color 0.3s;
  display: flex;
  flex-direction: column;
}

.exercise-card:hover {
  border-color: var(--accent, #0f0);
}

.exercise-img {
  width: 100%;
  height: 15.625rem;
  object-fit: cover;
  background-color: #fff;
  flex-shrink: 0;
}

.card-content {
  padding: 1rem;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr;
  gap: 0;
  flex: 1;
}

.exercise-title {
  margin: 0 0 1rem 0;
  font-size: 1rem;
  color: var(--white, #fff);
  border-bottom: 1px solid var(--dark, #333);
  padding-bottom: 0.5rem;
  grid-row: 1;
}

.tag-section {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  grid-row: 2;
}

.tag-group {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

.group-label {
  font-size: 0.65rem;
  color: #888;
  letter-spacing: 0.0625rem;
  font-family: monospace;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-size: 0.75rem;
  background: var(--dark, #333);
  color: var(--accent, #0f0);
  padding: 0.2rem 0.6rem;
  font-family: monospace;
  border-radius: 0.125rem;
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
  letter-spacing: 0.0625rem;
}

.toggle-btn {
  margin-top: 0.75em;
}

/* Instructions Overlay Modal */
.instructions-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.instructions-modal {
  background: var(--darkGrey, #24283b);
  border: 2px solid var(--accent, #ff9e64);
  border-radius: 0.25rem;
  max-width: 43.75rem;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 0 30px rgba(0, 0, 0, 0.9);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1.5rem;
  border-bottom: 1px solid var(--accent, #ff9e64);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.modal-header h3 {
  margin: 0;
  color: var(--accent, #ff9e64);
  font-size: 1.1rem;
  letter-spacing: 0.0625rem;
}

.close-btn {
  background: none;
  border: none;
  color: var(--accent, #ff9e64);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.close-btn:hover {
  color: var(--accentHover, #db4b4b);
  transform: scale(1.1);
}

.modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.instruction-content {
  margin-bottom: 2rem;
}

.instruction-content:last-child {
  margin-bottom: 0;
}

.exercise-modal-img {
  width: 100%;
  margin-top: 1.5rem;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  border-radius: 0.25rem;
  overflow: hidden;
  max-width: 18.75rem;
}

.exercise-modal-img img {
  width: 100%;
  height: auto;
  display: block;
}

.instruction-title {
  color: var(--white, #c0caf5);
  font-size: 1rem;
  margin: 0 0 1rem 0;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--accent, #ff9e64);
}

.instructions-list {
  color: var(--white, #c0caf5);
  font-size: 0.9rem;
  padding-left: 1.5rem;
  line-height: 1.6;
  margin: 0;
}

.instructions-list li {
  margin-bottom: 0.8rem;
  color: var(--light, #ffe5c7);
}

.step-number {
  color: var(--accent, #ff9e64);
  font-weight: bold;
  margin-right: 0.5rem;
}

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

.no-results {
  justify-content: center;
}

.no-results .sidebar {
  flex: 0 0 auto;
  max-width: 100%;
}

.no-results .cyber-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.no-results .input-group {
  width: 37.5rem;
  max-width: 100%;
}

.no-results .results-area {
  display: none;
}

@media screen and (max-width: 750px) {
  .no-results .sidebar {
    max-width: 100%;
    padding: 0 1rem;
  }

  .no-results .input-group {
    width: 100%;
  }
}
</style>