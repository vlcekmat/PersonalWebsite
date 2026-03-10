<script setup lang="ts">
import { onMounted, ref } from "vue";
import type { GuestbookMessage } from "@/model/GuestbookMessage";
import GuestbookMessageComponent from "@/components/GuestbookMessage.vue";
import { createClient } from "@supabase/supabase-js";

const enteredName = ref("Anonymous");
const enteredMessage = ref("");

const fetchedMessages = ref<GuestbookMessage[]>([]);

const BE_URL = "https://uadnilrvvoketmvhvusn.supabase.co";
const API_KEY = "sb_publishable_5Jij7ztFwHu2TQQqEQ6RhA_pBn0i1US";
const supabase = createClient(BE_URL, API_KEY);

const isLoading = ref(true);

const sendMessage = async () => {
  try {
    const { data, error } = await supabase
      .from("guestbook")
      .insert([
        {
          name: enteredName.value,
          message: enteredMessage.value,
        },
      ])
      .select();

    if (error) throw error;

    if (data && data.length > 0) {
      const newMessage = data[0];

      fetchedMessages.value.unshift({
        id: newMessage.id,
        name: newMessage.name,
        timestamp: new Date(newMessage.created_at).toLocaleString(),
        message: newMessage.message,
      });

      enteredMessage.value = "";
    }
  } catch (error) {
    console.error("Error sending message:", error);
    alert("Failed to send message.");
  }
};

onMounted(async () => {
  try {
    const { data, error } = await supabase.from("guestbook").select("*");

    if (error) {
      throw error;
    }

    isLoading.value = false;

    data?.forEach((message) => fetchedMessages.value.push({
      id: message.id,
      name: message.name,
      message: message.message,
      timestamp: new Date(message.created_at).toLocaleString(),
    }));
  } catch (error) {
    console.error("Error while loading the guestbook messages:", error);
  }
});
</script>

<template>
  <h2>Guestbook</h2>
  <p>
    Here you can find my guestbook! If you have any thoughts, a message or
    anything, feel free to leave it here!
  </p>

  <p class="bordered-bottom">To leave a message, simply fill the form below and hit submit!</p>

  <div class="my-flex">
    <form class="guestbook-form" @submit.prevent="sendMessage">
      <h5>Leave a message</h5>
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" v-model="enteredName" />

      <label for="message">Message:</label>
      <textarea
        id="message"
        name="message"
        rows="4"
        v-model="enteredMessage"
        required
      ></textarea>

      <button type="submit">Submit</button>
    </form>

    <div class="messages-container">
      <h5>Left messages</h5>

      <div v-if="isLoading" class="loading-wrapper">
        <div class="digital-spinner"></div>
      </div>

      <div v-else>
        <GuestbookMessageComponent
            v-for="mes in fetchedMessages.slice().reverse()"
            :key="mes.id"
            :name="mes.name"
            :datetime="mes.timestamp"
            :text="mes.message"
        />

        <p v-if="fetchedMessages.length === 0" class="no-messages">
          No messages yet. Be the first to sign!
        </p>
      </div>

    </div>
  </div>
</template>

<style scoped>
.my-flex {
  display: flex;
  justify-content: left;
  gap: 5em;
  margin-top: 3em;
}

.guestbook-form {
  display: flex;
  flex-direction: column;
  max-width: 100%;
  min-width: 30%;
}

.guestbook-form label {
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.guestbook-form input,
.guestbook-form textarea {
  padding: 0.5em;
  font-size: 1em;
  border: 1px solid var(--light);
  background-color: var(--white);
  color: var(--black);
  font-weight: bold;
  accent-color: var(--accent);
  caret-color: var(--accent);
}

.guestbook-form button {
  background-color: var(--dark);
  color: var(--light);
  margin-top: 1em;
  padding: 0.5em;
  font-size: 1.2em;
  cursor: pointer;
  accent-color: var(--accent);
}

.messages-container {
  width: 50vw;
}

textarea {
  resize: vertical;
}

.loading-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3em 0;
  color: var(--dark, #333);
}

.digital-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid var(--dark);
  border-left-color: var(--accent);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.no-messages {
  font-style: italic;
  opacity: 0.7;
  margin-top: 1em;
}

.bordered-bottom {
  border-bottom: var(--accent) 0.3em solid;
  padding-bottom: 2em;
}

@media screen and (max-width: 900px) {
  .my-flex {
    flex-direction: column;
    gap: 3em;
  }

  .messages-container {
    width: 100%;
  }

  .guestbook-form {
    max-width: 100%;
  }
}
</style>
